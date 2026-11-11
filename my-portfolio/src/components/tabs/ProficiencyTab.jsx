import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { PROFICIENCY } from '../../data/portfolio';
import './Tabs.css';

const MAX_LEVEL = 5;

/* What each step on the 1–5 scale means. */
const LEVELS = {
  1: 'Learning',
  2: 'Familiar',
  3: 'Working knowledge',
  4: 'Confident',
  5: 'Shipping daily',
};

const average = (items) => items.reduce((sum, item) => sum + item.level, 0) / items.length;

const RING_R = 26;
const RING_C = 2 * Math.PI * RING_R;

/* Group summary: a ring filled to the group's average level. Doubles as a
   filter button for the list below. */
function GroupRing({ group, index, isActive, onSelect }) {
  const avg = average(group.items);
  return (
    <motion.button
      type="button"
      className={`prof-ring${isActive ? ' is-active' : ''}`}
      aria-pressed={isActive}
      aria-label={`${group.heading}: average ${avg.toFixed(1)} out of ${MAX_LEVEL}. ${isActive ? 'Showing only this group' : 'Show only this group'}`}
      onClick={onSelect}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: EASE }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="prof-ring__graphic" aria-hidden="true">
        <svg viewBox="0 0 64 64">
          <circle className="prof-ring__track" cx="32" cy="32" r={RING_R} />
          <motion.circle
            className="prof-ring__fill"
            cx="32"
            cy="32"
            r={RING_R}
            strokeDasharray={RING_C}
            initial={{ strokeDashoffset: RING_C }}
            animate={{ strokeDashoffset: RING_C * (1 - avg / MAX_LEVEL) }}
            transition={{ duration: 1, delay: 0.15 + index * 0.08, ease: EASE }}
          />
        </svg>
        <i className={group.icon} />
      </span>
      <span className="prof-ring__text">
        <span className="prof-ring__name">{group.heading}</span>
        <span className="prof-ring__avg">
          {avg.toFixed(1)}
          <small>/{MAX_LEVEL}</small>
        </span>
      </span>
    </motion.button>
  );
}

/* One skill: five pips that light up to its level. */
function SkillRow({ item, index }) {
  return (
    <motion.div
      className="prof-row"
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: EASE }}
    >
      <span className="prof-row__name">{item.tag}</span>
      <span
        className="prof-row__pips"
        role="img"
        aria-label={`${item.tag}: ${item.level} out of ${MAX_LEVEL}, ${LEVELS[item.level]}`}
      >
        {Array.from({ length: MAX_LEVEL }, (_, step) => (
          <motion.span
            key={step}
            className={`prof-row__pip${step < item.level ? ' is-on' : ''}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.04 + step * 0.06, ease: EASE }}
          />
        ))}
      </span>
      <span className="prof-row__level" aria-hidden="true">
        {LEVELS[item.level]}
      </span>
    </motion.div>
  );
}

export default function ProficiencyTab() {
  const [focus, setFocus] = useState(null);
  const groups = focus ? PROFICIENCY.filter((g) => g.heading === focus) : PROFICIENCY;

  return (
    <div className="proficiency">
      <div className="prof-rings">
        {PROFICIENCY.map((group, index) => (
          <GroupRing
            key={group.heading}
            group={group}
            index={index}
            isActive={focus === group.heading}
            onSelect={() => setFocus((f) => (f === group.heading ? null : group.heading))}
          />
        ))}
      </div>

      <div className="prof-toolbar">
        <p className="prof-toolbar__hint">
          {focus ? (
            <>
              Showing <strong>{focus}</strong>
            </>
          ) : (
            'Tap a group to focus it'
          )}
        </p>
        {focus && (
          <button type="button" className="prof-toolbar__reset" onClick={() => setFocus(null)}>
            <i className="fa-solid fa-xmark" aria-hidden="true" /> Show all
          </button>
        )}
      </div>

      <div className="prof-groups">
        <AnimatePresence mode="popLayout" initial={false}>
          {groups.map((group) => (
            <motion.section
              key={group.heading}
              className="prof-group"
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h3 className="prof-group__title">
                <i className={group.icon} aria-hidden="true" />
                {group.heading}
              </h3>
              <div className="prof-group__rows">
                {group.items.map((item, index) => (
                  <SkillRow key={item.tag} item={item} index={index} />
                ))}
              </div>
            </motion.section>
          ))}
        </AnimatePresence>
      </div>

      <ol className="prof-legend" aria-label="Scale">
        {Object.entries(LEVELS).map(([level, label]) => (
          <li key={level}>
            <span className="prof-legend__pips" aria-hidden="true">
              {Array.from({ length: MAX_LEVEL }, (_, step) => (
                <span key={step} className={step < Number(level) ? 'is-on' : ''} />
              ))}
            </span>
            <span>
              {level} — {label}
            </span>
          </li>
        ))}
      </ol>

      <p className="proficiency__note">
        These levels are <strong>self-assessed</strong> — an honest read of how
        confidently I work with each tool today, not a certified or measured
        result. The certificates and shipped projects above are the verifiable
        record.
      </p>
    </div>
  );
}
