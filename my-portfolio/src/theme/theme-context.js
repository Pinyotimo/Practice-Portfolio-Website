import { createContext } from 'react';
import { THEMES } from './themes';

export const ThemeContext = createContext({
  theme: 'light',
  themes: THEMES,
  setTheme: () => {},
  toggleTheme: () => {},
});
