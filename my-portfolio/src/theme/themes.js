/* The six palettes the visitor can pick from.
   Each id maps to a `:root[data-theme="<id>"]` token block in themes.css.
   `mode` drives `color-scheme` (native form controls, scrollbars), and
   `meta` is the browser chrome colour. `swatch` is only for the picker.
   index.html has a pre-paint copy of the ids and dark modes — keep in sync. */

export const THEMES = [
  {
    id: 'light',
    label: 'Paper',
    mode: 'light',
    meta: '#f1f0ec',
    swatch: ['#f1f0ec', '#2954a6', '#c1531e'],
  },
  {
    id: 'dark',
    label: 'Midnight',
    mode: 'dark',
    meta: '#0f1114',
    swatch: ['#0f1114', '#6f9bff', '#e08a52'],
  },
  {
    id: 'ocean',
    label: 'Ocean',
    mode: 'dark',
    meta: '#071a22',
    swatch: ['#071a22', '#2dd4bf', '#f4a259'],
  },
  {
    id: 'forest',
    label: 'Forest',
    mode: 'light',
    meta: '#eef2ea',
    swatch: ['#eef2ea', '#2f6b3f', '#b8662b'],
  },
  {
    id: 'ember',
    label: 'Ember',
    mode: 'dark',
    meta: '#16100e',
    swatch: ['#16100e', '#ff7a45', '#f2c14e'],
  },
  {
    id: 'lavender',
    label: 'Lavender',
    mode: 'light',
    meta: '#f3f1f8',
    swatch: ['#f3f1f8', '#6a4fc9', '#d1497b'],
  },
];

export const THEME_IDS = THEMES.map((t) => t.id);

export const getTheme = (id) => THEMES.find((t) => t.id === id) ?? THEMES[0];
