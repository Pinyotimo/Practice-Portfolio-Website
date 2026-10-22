import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { ABOUT } from '../data/portfolio';
import SkillsTab from './tabs/SkillsTab';
import ExperienceTab from './tabs/ExperienceTab';
import EducationTab from './tabs/EducationTab';
import CoreTechTab from './tabs/CoreTechTab';
import ProficiencyTab from './tabs/ProficiencyTab';
import HobbiesTab from './tabs/HobbiesTab';
import './About.css';

const TABS = [
  { id: 'skills', label: 'Skills' },
  { id: 'core-technologies', label: 'Core tech' },
  { id: 'proficiency', label: 'Proficiency' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'hobbies', label: 'Hobbies' },
];

const TAB_COMPONENTS = {
  skills: SkillsTab,
  'core-technologies': CoreTechTab,
  proficiency: ProficiencyTab,
  experience: ExperienceTab,
  education: EducationTab,
  hobbies: HobbiesTab,
};

export default function About() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const tabRefs = useRef([]);
  const ActivePanel = TAB_COMPONENTS[activeTab];

  const onKeyDown = (event) => {
    const lastIndex = TABS.length - 1;
    let nextIndex = null;

    if (event.key === 'ArrowRight') nextIndex = activeTab === TABS[lastIndex].id ? 0 : TABS.findIndex((t) => t.id === activeTab) + 1;
    else if (event.key === 'ArrowLeft') nextIndex = activeTab === TABS[0].id ? lastIndex : TABS.findIndex((t) => t.id === activeTab) - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = lastIndex;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextId = TABS[nextIndex].id;
    setActiveTab(nextId);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <motion.section
      id="about"
      className="section section--soft"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">{ABOUT.kicker}</span>
            <h2 className="section-head__title">{ABOUT.title}</h2>
          </div>
          <p className="section-head__lede">{ABOUT.lead}</p>
        </div>

        <div className="about__grid">
          <div className="about__intro panel">
            <p className="about__body">{ABOUT.body}</p>

            <dl className="about__highlights">
              {ABOUT.highlights.map((item) => (
                <div key={item.label} className="about__highlight">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>

            <div className="about__cta">
              <a href="#impact" className="btn btn--ghost btn--sm">
                See the numbers
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="about__detail panel">
            <div
              className="tabs"
              role="tablist"
              aria-label="About me, by section"
              onKeyDown={onKeyDown}
            >
              {TABS.map((tab, index) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={`tab-${tab.id}`}
                    className={`tabs__tab${isActive ? ' is-active' : ''}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                    {isActive && (
                      <motion.span
                        layoutId="tab-underline"
                        className="tabs__underline"
                        transition={{ duration: 0.32, ease: EASE }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="tabs__panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  id={`panel-${activeTab}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${activeTab}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.26, ease: EASE }}
                  tabIndex={0}
                >
                  <ActivePanel />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
