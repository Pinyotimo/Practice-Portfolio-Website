import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import { MotionConfig } from 'framer-motion';
import { ThemeContext } from './theme-context';
import { THEMES, THEME_IDS, getTheme } from './themes';

const STORAGE_KEY = 'st-theme';

function readInitialTheme() {
  if (typeof window === 'undefined') return 'light';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (THEME_IDS.includes(stored)) return stored;
  } catch {
    /* localStorage can be blocked — fall through to the OS preference */
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(readInitialTheme);

  /* Layout effect, so the tokens are on <html> within the same commit —
     the view transition below snapshots the page right after it. */
  useLayoutEffect(() => {
    const { mode, meta } = getTheme(theme);
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.style.colorScheme = mode;

    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', meta);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* nothing to do — the theme still applies for this session */
    }
  }, [theme]);

  /* `origin` is an optional { x, y } in viewport pixels: the new palette
     grows out of that point as a circle, where the browser supports it. */
  const setTheme = useCallback((next, origin) => {
    const id = THEME_IDS.includes(next) ? next : 'light';
    const apply = () => flushSync(() => setThemeState(id));

    if (!document.startViewTransition || prefersReducedMotion()) {
      apply();
      return;
    }

    const root = document.documentElement;
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty(
      '--vt-r',
      `${Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))}px`,
    );
    document.startViewTransition(apply);
  }, []);

  /* Light ↔ dark shortcut, kept for anything that only wants a toggle. */
  const toggleTheme = useCallback(() => {
    setTheme(getTheme(theme).mode === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const value = useMemo(
    () => ({ theme, themes: THEMES, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {/* `user` makes Framer Motion respect prefers-reduced-motion for every
          animation in the tree, without each component having to opt in. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}
