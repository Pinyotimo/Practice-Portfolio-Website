import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { HOBBIES } from '../../data/portfolio';
import './Tabs.css';

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function HobbiesTab() {
  return (
    <motion.ul className="detail-list" variants={containerVariants} initial="hidden" animate="show">
      {HOBBIES.map((hobby) => (
        <motion.li key={hobby.title} className="detail-list__item" variants={itemVariants}>
          <span className="detail-list__tag">{hobby.title}</span>
          <span className="detail-list__body">
            <span className="detail-list__desc">{hobby.desc}</span>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
