import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillsTab from './tabs/SkillsTab';
import ExperienceTab from './tabs/ExperienceTab';
import EducationTab from './tabs/EducationTab';
import CoreTechTab from './tabs/CoreTechTab';
import HobbiesTab from './tabs/HobbiesTab';

export default function About() {
  const [activeTab, setActiveTab] = useState('skills');

  // Helper function to cleanly render the active tab component
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

  return (
    <motion.section 
      id="about"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <div className="row">
          <div className="about-col-2">
            <h2 className="sub-title">About Me</h2>
            <p>
              I'm a Software Engineer and Web Developer studying Computer Science at
              The Co-operative University of Kenya. I love building responsive,
              user-friendly applications and writing clean, scalable code — with a
              growing focus on AI-assisted development and full-stack engineering.
            </p>

            <div className="about-highlights" aria-label="Professional highlights">
              <div>
                <span>Focus</span>
                <strong>Full-stack Web</strong>
              </div>
              <div>
                <span>Style</span>
                <strong>Clean UI &amp; UX</strong>
              </div>
              <div>
                <span>Base</span>
                <strong>Nairobi, Kenya</strong>
              </div>
            </div>

            {/* Tabs */}
            <div className="tab-titles" role="tablist" aria-label="About sections">
              {['skills', 'experience', 'education', 'core-technologies', 'hobbies'].map((tab) => (
                <button 
                  key={tab}
                  className={`tab-links ${activeTab === tab ? 'active-link' : ''}`} 
                  onClick={() => setActiveTab(tab)}
                  role="tab" 
                  aria-selected={activeTab === tab} 
                  type="button"
                >
                  {tab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>

            {/* Animated Tab Content */}
            <div className="tab-container" style={{ minHeight: '350px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab} // The key tells Framer Motion when the tab changes
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="tab-contents active-tab"
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