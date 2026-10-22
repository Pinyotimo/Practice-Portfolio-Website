import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { SKILLS } from '../../data/portfolio';
import './Tabs.css';

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function SkillsTab() {
  return (
    <motion.ul className="detail-list" variants={containerVariants} initial="hidden" animate="show">
      {SKILLS.map((skill) => (
        <motion.li key={skill.title} className="detail-list__item" variants={itemVariants}>
          <span className="detail-list__tag">{skill.title}</span>
          <span className="detail-list__body">
            <span className="detail-list__desc">{skill.desc}</span>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
