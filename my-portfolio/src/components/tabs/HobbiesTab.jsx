import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { HOBBIES } from '../../data/portfolio';
import './Tabs.css';

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function HobbiesTab() {
  return (
    <div className="hobbies">
      <p className="hobbies__intro">Away from the keyboard — what keeps me curious and recharged.</p>

      <motion.ul className="hobbies__grid" variants={containerVariants} initial="hidden" animate="show">
        {HOBBIES.map((hobby, index) => (
          <motion.li key={hobby.title} className="hobby-card" variants={itemVariants}>
            <span className="hobby-card__art" aria-hidden="true">
              <i className={hobby.icon ?? 'fa-solid fa-star'} />
            </span>
            <span className="hobby-card__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="hobby-card__title">{hobby.title}</h3>
            <p className="hobby-card__desc">{hobby.desc}</p>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}
