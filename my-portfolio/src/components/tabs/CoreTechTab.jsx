import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { TECH_CATEGORIES } from '../../data/portfolio';
import './Tabs.css';

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

export default function CoreTechTab() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      {TECH_CATEGORIES.map((category) => (
        <div key={category.heading} className="detail-list__group">
          <motion.h3 className="detail-list__heading" variants={itemVariants}>
            {category.heading}
          </motion.h3>
          <ul className="detail-list">
            {category.items.map((item) => (
              <motion.li key={item.tag} className="detail-list__item" variants={itemVariants}>
                <span className="detail-list__tag">{item.tag}</span>
                <span className="detail-list__body">
                  <span className="detail-list__desc">{item.desc}</span>
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </motion.div>
  );
}
