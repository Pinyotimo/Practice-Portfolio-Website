import { useState } from 'react';
import { motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [logoHover, setLogoHover] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    nav: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 24,
      padding: isMobile ? '10px 14px' : '16px 28px',
      background: 'rgba(241,240,236,.92)',
      borderBottom: '1px solid var(--hairline)',
      backdropFilter: 'blur(8px)',
    },
    logo: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      textDecoration: 'none',
      color: logoHover ? 'var(--accent)' : 'var(--ink)',
      fontWeight: 700,
      fontFamily: "'Space Grotesk', sans-serif",
      transition: 'color .15s ease',
    },
    logoMark: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isMobile ? 36 : 40,
      height: isMobile ? 36 : 40,
      borderRadius: 3,
      background: 'var(--accent)',
      color: '#fff',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: isMobile ? 13 : 14,
      fontWeight: 500,
      flexShrink: 0,
    },
    logoText: {
      fontSize: isMobile ? '.9rem' : '.98rem',
      whiteSpace: 'nowrap',
      display: isMobile ? 'none' : 'inline',
    },
    navToggle: {
      display: isMobile ? 'flex' : 'none',
      width: 28,
      height: 20,
      padding: 0,
      border: 0,
      background: 'transparent',
      cursor: 'pointer',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    toggleSpan: (i) => ({
      display: 'block',
      width: '100%',
      height: 2,
      background: 'var(--ink)',
      transition: 'transform .25s ease, opacity .25s ease',
      transform:
        isOpen && i === 0 ? 'translateY(8px) rotate(45deg)' :
        isOpen && i === 2 ? 'translateY(-8px) rotate(-45deg)' : 'none',
      opacity: isOpen && i === 1 ? 0 : 1,
    }),
    navList: {
      display: isMobile ? (isOpen ? 'flex' : 'none') : 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'stretch' : 'center',
      gap: isMobile ? 4 : 4,
      listStyle: 'none',
      ...(isMobile
        ? {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 20,
            width: '100%',
            padding: '12px 18px 18px',
            background: 'var(--bg-main)',
            borderBottom: '1px solid var(--hairline)',
          }
        : {}),
    },
    link: (name) => ({
      display: 'block',
      padding: isMobile ? '12px 14px' : '8px 14px',
      borderRadius: 3,
      color: hoveredLink === name ? 'var(--accent)' : 'var(--ink-soft)',
      background: hoveredLink === name && !isMobile ? 'var(--accent-soft)' : 'transparent',
      textDecoration: 'none',
      fontSize: '.95rem',
      fontWeight: 500,
      fontFamily: "'IBM Plex Mono', monospace",
      transition: 'color .15s ease, background-color .15s ease',
      textAlign: isMobile ? 'left' : 'center',
    }),
  };

  return (
    <motion.header
      id="header"
      style={styles.header}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <nav style={styles.nav}>
          <motion.a
            href="#home"
            style={styles.logo}
            aria-label="Go to homepage"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span style={styles.logoMark}>SO</span>
            <span style={styles.logoText}>Stephen Oduor</span>
          </motion.a>

          <button
            style={styles.navToggle}
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            type="button"
            onClick={toggleMenu}
          >
            <span style={styles.toggleSpan(0)}></span>
            <span style={styles.toggleSpan(1)}></span>
            <span style={styles.toggleSpan(2)}></span>
          </button>

          <motion.ul
            style={styles.navList}
            variants={navVariants}
            initial="hidden"
            animate="show"
          >
            {NAV_LINKS.map((link) => (
              <motion.li key={link.name} variants={linkVariants}>
                <a
                  href={link.href}
                  style={styles.link(link.name)}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  onClick={closeMenu}
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
}