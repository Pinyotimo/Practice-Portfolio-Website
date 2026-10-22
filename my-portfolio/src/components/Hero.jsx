import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { HERO } from '../data/portfolio';
import './Hero.css';

const rise = (delay) => ({
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
});

export default function Hero() {
  return (
    <motion.section
      id="home"
      className="hero section"
      initial="hidden"
      animate="show"
    >
      <div className="container hero__grid">
        <motion.div className="hero__figure" variants={rise(0.05)}>
          <div className="hero__photo">
            <img
              src="/Images/profile-photo.jpg"
              width="1024"
              height="1024"
              alt="Portrait of Stephen Oduor"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
          >
            <i className="fa-solid fa-trophy" aria-hidden="true" />
            <span>
              <strong>Runner-up</strong>
              SmartAuction B2B hackathon
            </span>
          </motion.div>
        </motion.div>

        <div className="hero__body">
          <motion.p className="hero__status" variants={rise(0.1)}>
            <span className="hero__status-dot" aria-hidden="true" />
            {HERO.kicker}
          </motion.p>

          <motion.h1 className="hero__title" variants={rise(0.16)}>
            {HERO.heading} <span className="hero__title-accent">{HERO.highlight}</span>
          </motion.h1>

          <motion.p className="hero__lead" variants={rise(0.24)}>
            {HERO.lead}
          </motion.p>

          <motion.ul className="hero__tools" variants={rise(0.3)}>
            {HERO.tools.map((tool) => (
              <li key={tool} className="tag tag--plain">
                {tool}
              </li>
            ))}
          </motion.ul>

          <motion.div className="hero__actions" variants={rise(0.36)}>
            <a href="#portfolio" className="btn">
              See my work
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Get in touch
            </a>
            <a
              href="/Images/Stephen-Oduor-CV.pdf"
              download
              className="btn btn--ghost"
            >
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
