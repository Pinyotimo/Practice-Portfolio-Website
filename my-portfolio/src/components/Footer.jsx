import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { NAV_LINKS, SITE, SOCIAL_LINKS } from '../data/portfolio';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <span className="site-footer__mark" aria-hidden="true">
              SO
            </span>
            <p className="site-footer__blurb">
              {SITE.role} based in {SITE.location}. I build full-stack web
              applications and I am always up for the next one.
            </p>
            <a href="#home" className="site-footer__to-top">
              <i className="fa-solid fa-arrow-up" aria-hidden="true" />
              Back to top
            </a>
          </div>

          <nav className="site-footer__col" aria-label="Footer navigation">
            <h2 className="site-footer__heading">Sections</h2>
            <ul className="site-footer__list">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-footer__col" aria-label="Social links">
            <h2 className="site-footer__heading">Elsewhere</h2>
            <ul className="site-footer__list">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="site-footer__meta">
            Built with React, Vite and Framer Motion —{' '}
            <a href={SITE.email} className="site-footer__email">
              {SITE.email}
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
