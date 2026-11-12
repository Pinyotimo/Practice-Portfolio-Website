import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE, riseIn, stagger } from '../lib/motion';
import { ABOUT, HERO } from '../data/portfolio';
import SkillsTab from './tabs/SkillsTab';
import ExperienceTab from './tabs/ExperienceTab';
import EducationTab from './tabs/EducationTab';
import CoreTechTab from './tabs/CoreTechTab';
import ProficiencyTab from './tabs/ProficiencyTab';
import HobbiesTab from './tabs/HobbiesTab';
import './About.css';

const TABS = [
  { id: 'skills', label: 'Skills', icon: 'fa-solid fa-screwdriver-wrench' },
  { id: 'core-technologies', label: 'Core tech', icon: 'fa-solid fa-microchip' },
  { id: 'proficiency', label: 'Proficiency', icon: 'fa-solid fa-gauge-high' },
  { id: 'experience', label: 'Experience', icon: 'fa-solid fa-briefcase' },
  { id: 'education', label: 'Education', icon: 'fa-solid fa-graduation-cap' },
  { id: 'hobbies', label: 'Hobbies', icon: 'fa-solid fa-person-swimming' },
];

const TAB_COMPONENTS = {
  skills: SkillsTab,
  'core-technologies': CoreTechTab,
  proficiency: ProficiencyTab,
  experience: ExperienceTab,
  education: EducationTab,
  hobbies: HobbiesTab,
};

/* Decorative editor window: the same facts as the highlights, written as a
   JS object and revealed line by line. Hidden from assistive tech — the
   <dl> beside it carries the content. */
function CodeCard({ highlights }) {
  const lines = [
    [{ t: 'kw', v: 'const ' }, { t: 'var', v: 'steve' }, { t: 'pun', v: ' = {' }],
    ...highlights.map((h) => [
      { t: 'key', v: `  ${h.key}` },
      { t: 'pun', v: ': ' },
      { t: 'str', v: `'${h.value}'` },
      { t: 'pun', v: ',' },
    ]),
    [
      { t: 'key', v: '  stack' },
      { t: 'pun', v: ': [' },
      ...HERO.tools.slice(0, 3).flatMap((tool, i) => [
        ...(i ? [{ t: 'pun', v: ', ' }] : []),
        { t: 'str', v: `'${tool}'` },
      ]),
      { t: 'pun', v: '],' },
    ],
    [{ t: 'key', v: '  openToWork' }, { t: 'pun', v: ': ' }, { t: 'kw', v: 'true' }, { t: 'pun', v: ',' }],
    [{ t: 'pun', v: '};' }],
  ];

  return (
    <motion.div
      className="code-card"
      aria-hidden="true"
      initial={{ opacity: 0, y: 20, rotate: 1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="code-card__bar">
        <span />
        <span />
        <span />
        <em>about.js</em>
      </div>
      <motion.pre
        className="code-card__body"
        variants={stagger(0.11, 0.35)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {lines.map((tokens, i) => (
          <motion.code
            key={i}
            className="code-card__line"
            variants={{
              hidden: { opacity: 0, x: -8 },
              show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
            }}
          >
            <span className="code-card__ln">{i + 1}</span>
            {tokens.map((tok, j) => (
              <span key={j} className={`tok-${tok.t}`}>
                {tok.v}
              </span>
            ))}
          </motion.code>
        ))}
        <span className="code-card__cursor" />
      </motion.pre>
    </motion.div>
  );
}

export default function About() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [visited, setVisited] = useState(() => new Set([TABS[0].id]));
  const tabRefs = useRef([]);
  const tablistRef = useRef(null);
  const ActivePanel = TAB_COMPONENTS[activeTab];
  const activeIndex = TABS.findIndex((t) => t.id === activeTab);
  const prevTab = TABS[activeIndex - 1];
  const nextTab = TABS[activeIndex + 1];
  const unseen = TABS.length - visited.size;

  const selectTab = (id) => {
    setActiveTab(id);
    setVisited((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
  };

  /* Pager at the bottom of a panel: switch tab, then bring the tab bar back
     into view so the new section starts from its top. */
  const stepTo = (tab) => {
    selectTab(tab.id);
    const bar = tablistRef.current;
    if (bar && bar.getBoundingClientRect().top < 0) {
      bar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
    selectTab(nextId);
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
            <span className="about__glow" aria-hidden="true" />

            <div className="about__intro-copy">
              <p className="about__body">{ABOUT.body}</p>

              <motion.dl
                className="about__highlights"
                variants={stagger(0.09, 0.15)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                {ABOUT.highlights.map((item) => (
                  <motion.div
                    key={item.label}
                    className="about__highlight"
                    variants={riseIn}
                    whileHover={{ y: -3 }}
                  >
                    <span className="about__highlight-icon" aria-hidden="true">
                      <i className={item.icon} />
                    </span>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </motion.div>
                ))}
              </motion.dl>

              <div className="about__cta">
                <a href="#impact" className="btn btn--ghost btn--sm">
                  See the numbers
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </a>
              </div>
            </div>

            <CodeCard highlights={ABOUT.highlights} />
          </div>

          <div className="about__detail panel">
            <div
              ref={tablistRef}
              className="tabs"
              role="tablist"
              aria-label="About me, by section"
              onKeyDown={onKeyDown}
            >
              {TABS.map((tab, index) => {
                const isActive = activeTab === tab.id;
                const isNew = !visited.has(tab.id);
                return (
                  <button
                    key={tab.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    id={`tab-${tab.id}`}
                    className={`tabs__tab${isActive ? ' is-active' : ''}${isNew ? ' is-new' : ''}`}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectTab(tab.id)}
                  >
                    <i className={`${tab.icon} tabs__icon`} aria-hidden="true" />
                    <span className="tabs__label">{tab.label}</span>
                    {isNew && (
                      <span className="tabs__new" aria-hidden="true" />
                    )}
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

            <nav className="tabs__pager" aria-label="About sections">
              {prevTab ? (
                <button
                  type="button"
                  className="tabs__step tabs__step--prev"
                  onClick={() => stepTo(prevTab)}
                >
                  <i className="fa-solid fa-arrow-left" aria-hidden="true" />
                  <span className="tabs__step-text">
                    <span className="tabs__step-hint">Previous</span>
                    <span className="tabs__step-label">{prevTab.label}</span>
                  </span>
                </button>
              ) : (
                <span className="tabs__step-spacer" />
              )}

              <span className="tabs__progress" aria-live="polite">
                <span className="tabs__progress-dots" aria-hidden="true">
                  {TABS.map((tab) => (
                    <span
                      key={tab.id}
                      className={`tabs__progress-dot${tab.id === activeTab ? ' is-active' : ''}${
                        visited.has(tab.id) ? ' is-seen' : ''
                      }`}
                    />
                  ))}
                </span>
                <span className="tabs__progress-text">
                  {activeIndex + 1} of {TABS.length}
                  {unseen > 0 && ` · ${unseen} more to explore`}
                </span>
              </span>

              {nextTab ? (
                <button
                  type="button"
                  className="tabs__step tabs__step--next"
                  onClick={() => stepTo(nextTab)}
                >
                  <span className="tabs__step-text">
                    <span className="tabs__step-hint">Up next</span>
                    <span className="tabs__step-label">{nextTab.label}</span>
                  </span>
                  <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  className="tabs__step tabs__step--next"
                  onClick={() => stepTo(TABS[0])}
                >
                  <span className="tabs__step-text">
                    <span className="tabs__step-hint">Start over</span>
                    <span className="tabs__step-label">{TABS[0].label}</span>
                  </span>
                  <i className="fa-solid fa-rotate-left" aria-hidden="true" />
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
