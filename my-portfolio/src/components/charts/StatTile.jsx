import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

/**
 * A single headline number.
 *
 * Counts up from zero the first time it scrolls into view. The final value
 * is in the DOM from the start (and is what assistive tech reads), so the
 * animation is purely visual.
 */
export default function StatTile({ value, label, note, icon, index = 0 }) {
  const numberRef = useRef(null);
  const tileRef = useRef(null);
  const inView = useInView(tileRef, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion || typeof value !== 'number') return undefined;
    const node = numberRef.current;
    const controls = animate(0, value, {
      duration: 1.1,
      delay: index * 0.12,
      ease: [0.22, 0.61, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value, index]);

  return (
    <div className="stat-tile" ref={tileRef} style={{ '--stat-i': index }}>
      <div className="stat-tile__top">
        {icon && (
          <span className="stat-tile__icon" aria-hidden="true">
            <i className={icon} />
          </span>
        )}
        <span className="stat-tile__value">
          <span ref={numberRef} aria-hidden="true">
            {value}
          </span>
          <span className="sr-only">{value}</span>
        </span>
      </div>
      <span className="stat-tile__label">{label}</span>
      {note && <span className="stat-tile__note">{note}</span>}
    </div>
  );
}
