import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import useTheme from '../theme/useTheme';
import { getTheme } from '../theme/themes';
import './ThemePicker.css';

function Swatch({ colors, size = 'md' }) {
  const [bg, accent, highlight] = colors;
  return (
    <span className={`swatch swatch--${size}`} style={{ background: bg }} aria-hidden="true">
      <span style={{ background: accent }} />
      <span style={{ background: highlight }} />
    </span>
  );
}

export default function ThemePicker() {
  const { theme, themes, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const itemRefs = useRef([]);
  const menuId = useId();
  const current = getTheme(theme);

  /* Close on outside click and Escape; focus the chosen theme on open. */
  useEffect(() => {
    if (!isOpen) return undefined;

    const activeIndex = themes.findIndex((t) => t.id === theme);
    requestAnimationFrame(() => itemRefs.current[activeIndex]?.focus());

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) setIsOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
    // Only on open — re-running on theme change would steal focus mid-pick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const choose = (id) => {
    const rect = buttonRef.current.getBoundingClientRect();
    setIsOpen(false);
    buttonRef.current.focus();
    if (id !== theme) {
      setTheme(id, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
  };

  const onMenuKeyDown = (event) => {
    const count = themes.length;
    const index = itemRefs.current.indexOf(document.activeElement);
    let next = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % count;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + count) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else if (event.key === 'Tab') setIsOpen(false);
    if (next === null) return;
    event.preventDefault();
    itemRefs.current[next]?.focus();
  };

  return (
    <div className="theme-picker" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="icon-btn theme-picker__button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={`Change theme (current: ${current.label})`}
        title="Change theme"
        onClick={() => setIsOpen((open) => !open)}
      >
        <motion.i
          className="fa-solid fa-palette"
          aria-hidden="true"
          animate={{ rotate: isOpen ? -25 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        />
        <span className="theme-picker__dot" style={{ background: current.swatch[1] }} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={menuId}
            className="theme-picker__menu"
            role="menu"
            aria-label="Themes"
            onKeyDown={onMenuKeyDown}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <p className="theme-picker__heading">Theme</p>
            <div className="theme-picker__grid">
              {themes.map((t, index) => {
                const isActive = t.id === theme;
                return (
                  <motion.button
                    key={t.id}
                    ref={(node) => {
                      itemRefs.current[index] = node;
                    }}
                    type="button"
                    role="menuitemradio"
                    aria-checked={isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={`theme-picker__item${isActive ? ' is-active' : ''}`}
                    onClick={() => choose(t.id)}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, delay: 0.03 * index, ease: EASE }}
                  >
                    <Swatch colors={t.swatch} />
                    <span className="theme-picker__label">
                      {t.label}
                      <small>{t.mode}</small>
                    </span>
                    {isActive && (
                      <motion.i
                        layoutId="theme-check"
                        className="fa-solid fa-check theme-picker__check"
                        aria-hidden="true"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
