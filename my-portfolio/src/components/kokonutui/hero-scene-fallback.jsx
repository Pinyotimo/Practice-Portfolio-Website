/* ==========================================================================
   Fallback scene — the same composition as the WebGL hero, drawn in SVG.
   Shown when WebGL is unavailable, when the visitor prefers reduced motion,
   or on very small screens. Decorative: the DOM hero carries every word.
   ========================================================================== */

import { useMemo } from 'react';

/** A low-poly-ish isometric tile cluster in an SVG viewBox. */
export default function HeroSceneFallback() {
  const tiles = useMemo(() => {
    const rng = (n) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    const cols = 9;
    const rows = 5;
    const out = [];
    for (let i = 0; i < cols * rows; i += 1) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const roll = rng(i + 3);
      out.push({
        x: 12 + col * 26 + (row % 2) * 13,
        y: 26 + row * 26,
        height: 6 + rng(i + 1) * 26,
        accent: roll > 0.9,
        rust: roll > 0.82 && roll <= 0.9,
        green: roll > 0.74 && roll <= 0.82,
      });
    }
    return out;
  }, []);

  return (
    <div className="hero-scene hero-scene--fallback" aria-hidden="true">
      <svg viewBox="0 0 260 190" className="hero-scene__svg" focusable="false">
        {tiles.map((tile, i) => (
          <g key={i}>
            <rect
              x={tile.x}
              y={tile.y - tile.height}
              width="18"
              height={tile.height}
              rx="2"
              className={
                tile.accent
                  ? 'hero-scene__tile hero-scene__tile--accent'
                  : tile.rust
                    ? 'hero-scene__tile hero-scene__tile--rust'
                    : tile.green
                      ? 'hero-scene__tile hero-scene__tile--green'
                      : 'hero-scene__tile'
              }
            />
            <rect
              x={tile.x}
              y={tile.y - tile.height - 5}
              width="18"
              height="5"
              rx="1.5"
              className="hero-scene__tile-top"
            />
          </g>
        ))}
        <polygon
          points="206,30 222,58 190,58"
          className="hero-scene__solid hero-scene__solid--accent"
        />
        <circle cx="52" cy="46" r="13" className="hero-scene__solid hero-scene__solid--rust" />
        <rect
          x="96"
          y="52"
          width="16"
          height="16"
          rx="3"
          className="hero-scene__solid hero-scene__solid--green"
        />
      </svg>
      <div className="hero-scene__scrim" aria-hidden="true" />
    </div>
  );
}
