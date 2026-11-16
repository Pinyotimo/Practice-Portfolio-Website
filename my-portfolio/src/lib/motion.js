/* ==========================================================================
   Motion primitives
   One easing curve, one duration scale, one set of entrance variants —
   so every section on the page moves the same way.
   ========================================================================== */

export const EASE = [0.22, 0.61, 0.36, 1];
export const EASE_IN_OUT = [0.65, 0, 0.35, 1];

/* A section drifting into place. */
export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* A card in a list, revealed one after another. */
export const stagger = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren, delayChildren },
  },
});

export const riseIn = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

export const slideIn = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: EASE },
  },
};

/* Props shared by every scroll-triggered section. */
export const inView = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.15 },
};

/* --------------------------------------------------------------------------
   Scroll-linked motion (parallax / scrubbed reveals).
   `from` and `to` are numeric ranges; `ref` is the element that owns them.
   -------------------------------------------------------------------------- */

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Scroll progress of an element through the viewport, as a motion value.
 *
 * `offset` follows framer-motion's useScroll syntax. Returns a MotionValue
 * between 0 (element's top hits the viewport bottom) and 1 (its bottom
 * leaves the viewport top) — the range every scrubbed effect wants.
 */
export function useScrollProgress(ref, offset = ['start end', 'end start']) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset,
  });
  // A spring only smooths motion; with reduced motion we hand back the raw
  // progress so callers can still render a scrubbed *state* without drift.
  const raw = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  return reduceMotion ? scrollYProgress : raw;
}

/** Convenience wrapper: `transform(progress, [0, 1], [-20, 20])`. */
export function useScrubbed(ref, from, to, offset) {
  const progress = useScrollProgress(ref, offset);
  return useTransform(progress, [0, 1], from, to);
}

/**
 * Reveal-on-scroll with a soft safety net.
 *
 * framer-motion's whileInView handles most cases; this returns a `style`
 * object that starts visible so content is never stranded at opacity 0 if an
 * observer misses. Set `--reveal-ready` to switch to the animated path.
 */
export function useReveal(options = { amount: 0.2 }) {
  const [ready, setReady] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setReady(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { threshold: options.amount, rootMargin: '0px 0px -8% 0px' },
    );

    // Position poll: if the element is already past the fold when the
    // observer attaches, reveal it anyway.
    const poll = window.setInterval(() => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        setReady(true);
        observer.disconnect();
        window.clearInterval(poll);
      }
    }, 250);

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearInterval(poll);
    };
  }, [options.amount]);

  return { ref, ready };
}
