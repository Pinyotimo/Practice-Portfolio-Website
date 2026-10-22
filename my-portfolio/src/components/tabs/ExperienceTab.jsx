import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { EXPERIENCE } from '../../data/portfolio';
import './Tabs.css';

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

export default function ExperienceTab() {
  return (
    <motion.ul className="detail-list" variants={containerVariants} initial="hidden" animate="show">
      {EXPERIENCE.map((exp) => (
        <motion.li key={exp.id} className="detail-list__item" variants={itemVariants}>
          <span className="detail-list__tag">{exp.period}</span>
          <span className="detail-list__body">
            <span className="detail-list__title">
              {exp.role} <span className="detail-list__note">at</span> {exp.company}
            </span>
            {exp.desc && <span className="detail-list__note">{exp.desc}</span>}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
