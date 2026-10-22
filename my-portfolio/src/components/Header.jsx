import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { EASE } from '../lib/motion';
import { NAV_LINKS } from '../data/portfolio';
import useScrollSpy from '../hooks/useScrollSpy';
import useTheme from '../theme/useTheme';
import './Header.css';

const SECTION_IDS = NAV_LINKS.map((link) => link.id);

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollRequest, setScrollRequest] = useState(0);
  const pendingTarget = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const activeId = useScrollSpy(SECTION_IDS);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock the page behind the mobile drawer, and close it on Escape. */
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  /* The drawer locks the page behind it, so a plain #fragment navigation
     would be swallowed: the browser resolves the jump before the lock is
     released. Take the scroll over ourselves and run it once the lock is
     gone. */
  const goTo = useCallback((event, id) => {
    event.preventDefault();
    setIsOpen(false);
    pendingTarget.current = id;
    setScrollRequest((request) => request + 1);

    // Keep the address bar in step with the section we are jumping to.
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, '', `#${id}`);
    }
  }, []);

  useEffect(() => {
    const id = pendingTarget.current;
    if (!id) return undefined;

    pendingTarget.current = null;
    const target = document.getElementById(id);
    if (!target) return undefined;

    // A frame later the drawer is closed and the body scroll lock released.
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [scrollRequest, prefersReducedMotion]);

  return (
    <motion.header
      className={`site-header${isScrolled ? ' site-header--scrolled' : ''}`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <motion.div className="site-header__progress" style={{ scaleX: progress }} />

      <div className="container site-header__inner">
        <a href="#home" className="brand" aria-label="Go to the top of the page">
          <span className="brand__mark" aria-hidden="true">
            SO
          </span>
          <span className="brand__text">
            <span className="brand__name">Stephen Oduor</span>
            <span className="brand__role">Software Engineer</span>
          </span>
        </a>

        <nav className="site-nav" aria-label="Section navigation">
          <ul className="site-nav__list">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`site-nav__link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                    onClick={(event) => goTo(event, link.id)}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="site-nav__marker"
                        transition={{ duration: 0.35, ease: EASE }}
                      />
                    )}
                    <span className="site-nav__label">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="icon-btn theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                className="theme-toggle__icon"
                initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
                transition={{ duration: 0.22, ease: EASE }}
                aria-hidden="true"
              >
                <i className={theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} />
              </motion.span>
            </AnimatePresence>
          </button>

          <a
            href="#contact"
            className="btn btn--accent btn--sm site-header__cta"
            onClick={(event) => goTo(event, 'contact')}
          >
            Let’s talk
          </a>

          <button
            type="button"
            className={`icon-btn nav-toggle${isOpen ? ' is-open' : ''}`}
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <ul className="mobile-nav__list">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + index * 0.045, ease: EASE }}
                >
                  <a
                    href={`#${link.id}`}
                    className={`mobile-nav__link${activeId === link.id ? ' is-active' : ''}`}
                    onClick={(event) => goTo(event, link.id)}
                  >
                    <span className="mobile-nav__index">{String(index + 1).padStart(2, '0')}</span>
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn btn--accent btn--block"
              onClick={(event) => goTo(event, 'contact')}
            >
              Start a conversation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
