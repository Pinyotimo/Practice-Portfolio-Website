/* ==========================================================================
   useSceneTheme
   The palette the graphics layers (WebGL, canvas, SVG) draw with.
   Recomputes when data-theme changes; resolves every colour to hex because
   neither Three.js nor a 2D canvas context can parse oklch()/color-mix().

   useSyncExternalStore requires a stable snapshot: getSnapshot must return
   the SAME object until something actually changes, or React re-renders
   forever. The cache is keyed by the theme id, so a theme change produces a
   new object and everything else returns the cached one.
   ========================================================================== */

import { useSyncExternalStore } from 'react';
import { token, resetColorCache } from './theme-bridge';

export const FALLBACK_SCENE_THEME = {
  key: 'light',
  bg: '#f1f0ec',
  surface: '#ffffff',
  surfaceSoft: '#ebe9e2',
  surfaceSunken: '#e4e1d8',
  ink: '#15181c',
  ink2: '#4d535b',
  ink3: '#7b8087',
  line: '#d9d6cd',
  accent: '#2954a6',
  accentHover: '#1d4085',
  accentSoft: 'rgba(41,84,166,0.09)',
  rust: '#c1531e',
  chart1: '#2954a6',
  chart2: '#eb6834',
  chart3: '#199e70',
  chartTrack: '#dbe4f3',
};

const TOKENS = {
  bg: '--bg',
  surface: '--bg-elev',
  surfaceSoft: '--bg-soft',
  surfaceSunken: '--bg-sunken',
  ink: '--ink',
  ink2: '--ink-2',
  ink3: '--ink-3',
  line: '--line',
  accent: '--accent',
  accentHover: '--accent-hover',
  accentSoft: '--accent-soft',
  rust: '--rust',
  chart1: '--chart-1',
  chart2: '--chart-2',
  chart3: '--chart-3',
  chartTrack: '--chart-track',
};

/* theme id → resolved palette. Kept outside the hook so it survives renders. */
const cache = new Map();

function readTheme() {
  const key = document.documentElement.dataset.theme || 'light';
  const cached = cache.get(key);
  if (cached) return cached;

  const theme = { key };
  for (const [name, tokenName] of Object.entries(TOKENS)) {
    theme[name] = token(tokenName, FALLBACK_SCENE_THEME[name]);
  }
  cache.set(key, theme);
  return theme;
}

function subscribe(callback) {
  const root = document.documentElement;
  const observer = new MutationObserver(() => {
    resetColorCache();
    /* Drop the cached entry so the next read re-resolves the new palette. */
    cache.delete(root.dataset.theme || 'light');
    callback();
  });
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme', 'style'] });
  return () => observer.disconnect();
}

/**
 * The scene palette. Returns a cached object per theme, so the reference only
 * changes when the theme does — safe as a Three material dependency.
 */
export default function useSceneTheme() {
  return useSyncExternalStore(subscribe, readTheme, () => FALLBACK_SCENE_THEME);
}
