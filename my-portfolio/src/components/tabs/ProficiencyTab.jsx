import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { PROFICIENCY } from '../../data/portfolio';
import './Tabs.css';

const MAX_LEVEL = 5;

const groupVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export default function ProficiencyTab() {
  return (
    <div className="proficiency">
      {PROFICIENCY.map((group) => (
        <motion.section
          key={group.heading}
          className="proficiency__group"
          variants={groupVariants}
          initial="hidden"
          animate="show"
        >
          <h3 className="proficiency__group-title">{group.heading}</h3>

          <div className="proficiency__rows">
            {group.items.map((item) => (
              <div key={item.tag} className="proficiency__row">
                <span className="proficiency__name">{item.tag}</span>
                <div
                  className="proficiency__meter"
                  role="img"
                  aria-label={`${item.tag}: ${item.level} out of ${MAX_LEVEL}`}
                >
                  <motion.span
                    className="proficiency__fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: item.level / MAX_LEVEL }}
                    transition={{ duration: 0.7, ease: EASE }}
                  />
                </div>
                <span className="proficiency__value">{item.level}/{MAX_LEVEL}</span>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      <div className="proficiency__scale" aria-hidden="true">
        <span>1 — learning</span>
        <span>5 — shipping daily</span>
      </div>

      <p className="proficiency__note">
        These levels are <strong>self-assessed</strong> — an honest read of how
        confidently I work with each tool today, not a certified or measured
        result. The certificates and shipped projects above are the verifiable
        record.
      </p>
    </div>
  );
}
