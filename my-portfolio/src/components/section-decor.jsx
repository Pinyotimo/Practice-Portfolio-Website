/* ==========================================================================
   SectionDecor — the 2D graphic layer behind a section heading.
   A set of concentric rings, a dot field and a drifting accent pool, all
   from theme tokens. Decorative: the heading beside it carries the words.
   ========================================================================== */

import { useMemo } from 'react';
import { usePrefersReducedMotion } from '../hooks/useDeviceHints';
import './section-decor.css';

export default function SectionDecor({ variant = 'rings', className = '' }) {
  const reduced = usePrefersReducedMotion();

  const rings = useMemo(
    () => [
      { size: 340, opacity: 0.3 },
      { size: 250, opacity: 0.22 },
      { size: 165, opacity: 0.16 },
    ],
    [],
  );

  return (
    <div
      className={`section-decor section-decor--${variant}${className ? ` ${className}` : ''}`}
      aria-hidden="true"
    >
      {variant === 'rings' &&
        rings.map((ring) => (
          <span
            key={ring.size}
            className="section-decor__ring"
            style={{ width: ring.size, height: ring.size, opacity: ring.opacity }}
          />
        ))}

      {variant === 'grid' && <span className="section-decor__grid" />}

      {variant === 'pool' && (
        <>
          <span className="section-decor__pool section-decor__pool--a" />
          <span className="section-decor__pool section-decor__pool--b" />
        </>
      )}

      {!reduced && <span className="section-decor__scan" />}
    </div>
  );
}
