import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';
import SkillsTab from './tabs/SkillsTab';
import ExperienceTab from './tabs/ExperienceTab';
import EducationTab from './tabs/EducationTab';
import CoreTechTab from './tabs/CoreTechTab';
import HobbiesTab from './tabs/HobbiesTab';

const TABS = ['skills', 'experience', 'education', 'core-technologies', 'hobbies'];

export default function About() {
  const [activeTab, setActiveTab] = useState('skills');
  const [hoveredTab, setHoveredTab] = useState(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'skills': return <SkillsTab />;
      case 'experience': return <ExperienceTab />;
      case 'education': return <EducationTab />;
      case 'core-technologies': return <CoreTechTab />;
      case 'hobbies': return <HobbiesTab />;
      default: return <SkillsTab />;
    }
  };

  const styles = {
    section: { padding: isMobile ? '64px 0 24px' : '100px 0 40px' },
    container: { width: 'min(1120px, 90%)', margin: '0 auto' },
    row: { display: 'flex', justifyContent: 'space-between', alignItems: 'stretch', gap: 36, flexWrap: 'wrap' },
    aboutCol: {
      flex: '1 1 100%',
      padding: isMobile ? 18 : isTablet ? 28 : 44,
      background: 'var(--bg-panel)',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      boxShadow: '4px 4px 0 rgba(21,24,28,.06)',
    },
    subTitle: {
      margin: '0 0 24px',
      color: 'var(--ink)',
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: 'clamp(1.8rem, 2.6vw + .8rem, 2.8rem)',
      lineHeight: 1.1,
    },
    p: { maxWidth: 850, color: 'var(--ink-soft)', fontSize: '1.02rem', lineHeight: 1.85, margin: 0 },
    highlights: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, minmax(0,1fr))',
      gap: isMobile ? 16 : 24,
      maxWidth: 900,
      margin: '32px 0 4px',
    },
    highlightItem: { padding: '16px 0 0', borderTop: '1px solid var(--hairline)' },
    highlightLabel: {
      display: 'block',
      marginBottom: 8,
      color: 'var(--accent)',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '.76rem',
      fontWeight: 500,
    },
    highlightValue: { display: 'block', color: 'var(--ink)', fontSize: '1.02rem', lineHeight: 1.4, fontWeight: 600 },
    tabTitles: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: isMobile ? 2 : 4,
      margin: '32px 0 28px',
      borderBottom: '1px solid var(--hairline)',
    },
    tabLink: (tab) => ({
      flex: isMobile ? '1 1 calc(50% - 4px)' : '0 0 auto',
      minHeight: isMobile ? 42 : 44,
      padding: isMobile ? '10px 12px' : '10px 16px',
      background: 'transparent',
      border: 0,
      borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
      color: activeTab === tab ? 'var(--accent)' : hoveredTab === tab ? 'var(--accent)' : 'var(--ink-muted)',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '.92rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'color .15s ease, border-color .15s ease',
      marginBottom: -1,
      textAlign: isMobile ? 'center' : 'left',
    }),
    tabContainer: { minHeight: 350 },
  };

  return (
    <motion.section
      id="about"
      style={styles.section}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div style={styles.container}>
        <div style={styles.row}>
          <div style={styles.aboutCol}>
            <h2 style={styles.subTitle}>About Me</h2>
            <p style={styles.p}>
              I'm a Software Engineer with a B.Sc. in Computer Science from The
              Co-operative University of Kenya. I build responsive, user-friendly
              applications and write clean, scalable code — with a growing focus
              on AI-assisted development and full-stack engineering.
            </p>

            <div style={styles.highlights} aria-label="Professional highlights">
              <div style={styles.highlightItem}>
                <span style={styles.highlightLabel}>Focus</span>
                <strong style={styles.highlightValue}>Full-stack Web</strong>
              </div>
              <div style={styles.highlightItem}>
                <span style={styles.highlightLabel}>Style</span>
                <strong style={styles.highlightValue}>Clean UI &amp; UX</strong>
              </div>
              <div style={styles.highlightItem}>
                <span style={styles.highlightLabel}>Base</span>
                <strong style={styles.highlightValue}>Nairobi, Kenya</strong>
              </div>
            </div>

            <div style={styles.tabTitles} role="tablist" aria-label="About sections">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  style={styles.tabLink(tab)}
                  onClick={() => setActiveTab(tab)}
                  onMouseEnter={() => setHoveredTab(tab)}
                  onMouseLeave={() => setHoveredTab(null)}
                  role="tab"
                  aria-selected={activeTab === tab}
                  type="button"
                >
                  {tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>

            <div style={styles.tabContainer}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  role="tabpanel"
                >
                  {renderActiveTab()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}