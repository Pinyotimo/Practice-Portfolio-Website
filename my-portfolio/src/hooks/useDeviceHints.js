/* ==========================================================================
   Hooks: viewport, reduced motion, theme changes
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';

/** True when the user prefers reduced motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

/**
 * True while the element is on screen. One-shot by default.
 * Cheap stand-in for an IntersectionObserver-driven `whileInView`.
 */
export function useInViewport(options = {}) {
  const { threshold = 0.2, once = true } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin: '0px 0px -6% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, inView];
}

/**
 * Runs `callback` on every data-theme change, with the theme id.
 * Also fires once on mount.
 */
export function useThemeChange(callback) {
  /* The latest callback is read inside the observer, never during render. */
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => saved.current(root.dataset.theme));
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    saved.current(root.dataset.theme);
    return () => observer.disconnect();
  }, []);
}

/**
 * Device capability hints for the graphics layers: a coarse pointer and a
 * small viewport mean "keep the canvas cheap".
 */
export function useDeviceHints() {
  const [hints, setHints] = useState(() => ({
    coarse: typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches,
    narrow: typeof window !== 'undefined' && window.innerWidth < 768,
  }));

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)');
    const narrow = window.matchMedia('(max-width: 767px)');
    const update = () => setHints({ coarse: coarse.matches, narrow: narrow.matches });
    update();
    coarse.addEventListener('change', update);
    narrow.addEventListener('change', update);
    return () => {
      coarse.removeEventListener('change', update);
      narrow.removeEventListener('change', update);
    };
  }, []);

  return hints;
}
