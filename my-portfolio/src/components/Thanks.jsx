import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { SITE } from '../data/portfolio';
import './Thanks.css';

export default function Thanks() {
  return (
    <div className="thanks">
      <motion.div
        className="thanks__card panel"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <span className="kicker">Message received</span>

        <motion.div
          className="thanks__check"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.45, delay: 0.15, type: 'spring', stiffness: 220 }}
          aria-hidden="true"
        >
          <i className="fa-solid fa-check" />
        </motion.div>

        <h1 className="thanks__title">Message sent</h1>
        <p className="thanks__text">
          Thanks for reaching out — I read every message and usually reply
          within a day or two. If it’s urgent, email me directly at{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>

        <div className="thanks__actions">
          <a href="/" className="btn">
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            Back to portfolio
          </a>
        </div>
      </motion.div>
    </div>
  );
}
