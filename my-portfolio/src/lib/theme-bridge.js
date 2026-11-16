/* ==========================================================================
   Theme → renderer bridge
   Three.js and canvas 2D cannot parse oklch()/color-mix(), so every colour a
   graphic needs is resolved once to `#rrggbb` and cached per data-theme.
   ========================================================================== */

const CANVAS = typeof document !== 'undefined' ? document.createElement('canvas') : null;
const CONTEXT = CANVAS ? CANVAS.getContext('2d', { willReadFrequently: true }) : null;

const cache = new Map();

/**
 * Resolve a CSS colour to `#rrggbb`.
 * Returns null when the value cannot be resolved (unsupported syntax, a
 * value read before the document exists) — callers fall back.
 */
export function toHex(cssColor) {
  if (!CONTEXT || typeof cssColor !== 'string') return null;
  const key = cssColor.trim();
  if (cache.has(key)) return cache.get(key);

  CONTEXT.fillStyle = '#000';
  CONTEXT.fillStyle = key;
  CONTEXT.clearRect(0, 0, 1, 1);
  CONTEXT.fillRect(0, 0, 1, 1);

  const [r, g, b] = CONTEXT.getImageData(0, 0, 1, 1).data;
  const hex = `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
  cache.set(key, hex);
  return hex;
}

/** `var(--accent)` → `#rrggbb`, or null. */
export function token(name, fallback = null) {
  if (typeof window === 'undefined') return fallback;
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return toHex(value) || fallback;
}

/** Read a raw token (no colour resolution) — for numbers and lengths. */
export function rawToken(name, fallback = '') {
  if (typeof window === 'undefined') return fallback;
  return window.getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

/** Drop the colour cache — call it when the theme changes. */
export function resetColorCache() {
  cache.clear();
}

/** True when the user asked for less motion. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
