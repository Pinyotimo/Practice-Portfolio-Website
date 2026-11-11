import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { CERTIFICATIONS, SKILL_GROUPS, SKILLS } from '../../data/portfolio';
import { projectsUsing } from '../../lib/evidence';
import './Tabs.css';

const MAX_NAMED = 2;

const projectsFor = (skill) => projectsUsing(skill.match);

const certFor = (skill) => CERTIFICATIONS.find((cert) => cert.text === skill.cert);

function Evidence({ projects, cert }) {
  if (!projects.length && !cert) return null;
  const named = projects.slice(0, MAX_NAMED).map((p) => p.title);
  const rest = projects.length - named.length;

  return (
    <div className="skill-card__evidence">
      {projects.length > 0 && (
        <p title={projects.map((p) => p.title).join(', ')}>
          <i className="fa-solid fa-folder-open" aria-hidden="true" />
          <span>
            Used in <strong>{projects.length}</strong> project{projects.length > 1 ? 's' : ''}
            <span className="skill-card__names">
              {' — '}
              {named.join(', ')}
              {rest > 0 && ` +${rest} more`}
            </span>
          </span>
        </p>
      )}
      {cert && (
        <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link">
          <i className="fa-solid fa-certificate" aria-hidden="true" />
          {cert.text}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  );
}

export default function SkillsTab() {
  const [group, setGroup] = useState('all');

  const skills = useMemo(
    () => SKILLS.map((skill) => ({ ...skill, projects: projectsFor(skill), cert: certFor(skill) })),
    [],
  );

  const filters = [
    { id: 'all', label: 'All', icon: 'fa-solid fa-border-all', count: skills.length },
    ...SKILL_GROUPS.map((g) => ({ ...g, count: skills.filter((s) => s.group === g.id).length })),
  ];
  const visible = group === 'all' ? skills : skills.filter((s) => s.group === group);
  const groupLabel = (id) => SKILL_GROUPS.find((g) => g.id === id)?.label;

  return (
    <div className="skills">
      <div className="skills__filters" role="group" aria-label="Filter skills">
        {filters.map((f) => {
          const isActive = group === f.id;
          return (
            <button
              key={f.id}
              type="button"
              className={`skills__filter${isActive ? ' is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setGroup(f.id)}
            >
              {isActive && (
                <motion.span
                  layoutId="skills-filter"
                  className="skills__filter-bg"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <i className={f.icon} aria-hidden="true" />
              <span>{f.label}</span>
              <span className="skills__filter-count">{f.count}</span>
            </button>
          );
        })}
      </div>

      <motion.ul className="skills__grid" layout>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((skill, index) => (
            <motion.li
              key={skill.title}
              className="skill-card"
              layout
              initial={{ opacity: 0, y: 14, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.035, ease: EASE }}
            >
              <div className="skill-card__head">
                <span className="skill-card__icon" aria-hidden="true">
                  <i className={skill.icon} />
                </span>
                <div>
                  <h3 className="skill-card__title">{skill.title}</h3>
                  <span className="skill-card__group">{groupLabel(skill.group)}</span>
                </div>
              </div>

              <p className="skill-card__desc">{skill.desc}</p>

              <ul className="skill-card__tools" aria-label={`${skill.title} tools`}>
                {skill.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>

              <Evidence projects={skill.projects} cert={skill.cert} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}
