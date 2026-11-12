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
        <div className="site-footer__cta">
          <div className="site-footer__cta-text">
            <span className="site-footer__status">
              <span className="site-footer__status-dot" aria-hidden="true" />
              Available for new work
            </span>
            <p className="site-footer__cta-title">
              Have an idea worth building? <span>Let’s make it real.</span>
            </p>
          </div>
          <a href={`mailto:${SITE.email}`} className="btn btn--accent site-footer__cta-btn">
            <i className="fa-solid fa-paper-plane" aria-hidden="true" />
            Start a conversation
          </a>
        </div>

        <div className="site-footer__top">
          <div className="site-footer__brand">
            <a href="#home" className="site-footer__wordmark" aria-label={`${SITE.name}, back to top`}>
              <span className="site-footer__mark" aria-hidden="true">
                SO
              </span>
              <span className="site-footer__name">{SITE.name}</span>
            </a>
            <p className="site-footer__blurb">
              {SITE.role} based in {SITE.location}. I build full-stack web
              applications and I am always up for the next one.
            </p>
            <ul className="site-footer__socials">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="site-footer__social"
                    aria-label={`${social.label} (opens in a new tab)`}
                    title={social.label}
                  >
                    <i className={social.icon} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
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

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Contact</h2>
            <ul className="site-footer__list">
              <li>
                <a href={`mailto:${SITE.email}`} className="site-footer__email">
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="site-footer__plain">
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  {SITE.location}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p className="site-footer__copy">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className="site-footer__meta">Built with React, Vite and Framer Motion</p>
          <a href="#home" className="site-footer__to-top">
            Back to top
            <span className="site-footer__to-top-icon" aria-hidden="true">
              <i className="fa-solid fa-arrow-up" />
            </span>
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
