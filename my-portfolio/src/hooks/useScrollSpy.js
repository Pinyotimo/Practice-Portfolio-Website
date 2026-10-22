import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the navigation can mark it.
 *
 * Uses a rAF-throttled scroll listener rather than IntersectionObserver:
 * the "active" section is the last one whose top has passed a reading line
 * just under the sticky header, which is what a reader expects.
 */
export default function useScrollSpy(ids, offset = 140) {
  const [activeId, setActiveId] = useState(ids[0] ?? null);

  useEffect(() => {
    let frame = null;

    const measure = () => {
      frame = null;
      const line = window.scrollY + offset;

      let current = ids[0] ?? null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top + window.scrollY <= line) {
          current = id;
        }
      }

      // At the very bottom, always light up the last section.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      if (atBottom) {
        const last = ids[ids.length - 1];
        const el = document.getElementById(last);
        if (el) current = last;
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame !== null) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offset]);

  return activeId;
}
