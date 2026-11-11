import { motion } from 'framer-motion';
import { EASE, stagger } from '../../lib/motion';
import { EXPERIENCE, HACKATHONS, PROJECTS } from '../../data/portfolio';
import './Tabs.css';
import './Timeline.css';

const KIND_LABEL = { work: 'Role', freelance: 'Freelance', award: 'Hackathon' };

/* "2026-03" → months since year 0, so two dates subtract cleanly. */
const toMonths = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};

/* Inclusive length of an engagement: May → Aug is 4 months. */
function duration(start, end) {
  const now = new Date();
  const last = end ? toMonths(end) : now.getFullYear() * 12 + now.getMonth();
  const months = Math.max(last - toMonths(start) + 1, 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} yr${years > 1 ? 's' : ''}`);
  if (rest) parts.push(`${rest} mo${rest > 1 ? 's' : ''}`);
  return parts.join(' ');
}

const ROLES = [...EXPERIENCE].sort((a, b) => b.start.localeCompare(a.start));

const findProject = (title) =>
  PROJECTS.find((p) => p.title.toLowerCase() === title.toLowerCase());

const rise = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

export default function ExperienceTab() {
  return (
    <div className="exp">
      <section>
        <h3 className="tab-heading">
          <i className="fa-solid fa-briefcase" aria-hidden="true" />
          Roles & engagements
          <span className="tab-heading__count">{ROLES.length}</span>
        </h3>

        <motion.ol className="xp-timeline" variants={stagger(0.08)} initial="hidden" animate="show">
          {ROLES.map((exp) => (
            <motion.li
              key={exp.id}
              className={`xp-timeline__item xp-timeline__item--${exp.kind}${exp.ongoing ? ' is-ongoing' : ''}`}
              variants={rise}
            >
              <span className="xp-timeline__marker" aria-hidden="true">
                <i className={exp.icon} />
              </span>
              <div className="xp-timeline__card">
                <div className="xp-timeline__meta">
                  <span className="xp-timeline__period">{exp.period}</span>
                  <span className="xp-timeline__duration">{duration(exp.start, exp.end)}</span>
                  {exp.ongoing && <span className="xp-timeline__now">Now</span>}
                  <span className={`xp-timeline__kind xp-timeline__kind--${exp.kind}`}>{KIND_LABEL[exp.kind]}</span>
                </div>
                <p className="xp-timeline__title">
                  {exp.role} <span>at</span> {exp.company}
                </p>
                {exp.desc && <p className="xp-timeline__desc">{exp.desc}</p>}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <section>
        <h3 className="tab-heading">
          <i className="fa-solid fa-trophy" aria-hidden="true" />
          Hackathons
          <span className="tab-heading__count">{HACKATHONS.length}</span>
        </h3>

        <motion.ul className="hack-grid" variants={stagger(0.06, 0.2)} initial="hidden" animate="show">
          {HACKATHONS.map((hack) => {
            const project = findProject(hack.project);
            return (
              <motion.li
                key={hack.id}
                className={`hack-card${hack.result ? ' hack-card--placed' : ''}`}
                variants={rise}
              >
                <div className="hack-card__top">
                  <span className="hack-card__event">{hack.event}</span>
                  {hack.result && (
                    <span className="hack-card__result">
                      <i className="fa-solid fa-award" aria-hidden="true" /> {hack.result}
                    </span>
                  )}
                </div>
                <p className="hack-card__project">{hack.project}</p>
                <p className="hack-card__desc">{hack.desc}</p>
                {project && (
                  <div className="hack-card__foot">
                    <ul className="skill-card__tools" aria-label="Stack">
                      {project.stack.slice(0, 4).map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                      {project.stack.length > 4 && <li>+{project.stack.length - 4}</li>}
                    </ul>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                      >
                        View project
                        <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                        <span className="sr-only"> {hack.project} (opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                )}
              </motion.li>
            );
          })}
        </motion.ul>
      </section>
    </div>
  );
}
