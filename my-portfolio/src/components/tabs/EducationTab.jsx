import { motion } from 'framer-motion';
import { EASE, stagger } from '../../lib/motion';
import { CERTIFICATIONS, EDUCATION } from '../../data/portfolio';
import './Tabs.css';
import './Timeline.css';

const AREA_ICONS = {
  Networking: 'fa-solid fa-network-wired',
  Cybersecurity: 'fa-solid fa-shield-halved',
  'Data & AI': 'fa-solid fa-chart-simple',
  'Digital skills': 'fa-solid fa-globe',
};

/* Data titles end in " — " so they read as "Course — School" inline. */
const cleanTitle = (title) => title.replace(/\s*—\s*$/, '');

const DEGREES = EDUCATION.filter((e) => e.kind === 'degree');
const TRAINING = EDUCATION.filter((e) => e.kind !== 'degree');

const rise = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

function CertificateLink({ href, label, compact = false }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={compact ? 'cert-link' : 'cert-btn'}
      aria-label={`View the ${label} certificate (opens in a new tab)`}
    >
      <i className="fa-solid fa-file-pdf" aria-hidden="true" />
      View certificate
    </a>
  );
}

export default function EducationTab() {
  return (
    <div className="exp">
      <section>
        <h3 className="tab-heading">
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
          Education
        </h3>
        <motion.ol className="xp-timeline" variants={stagger(0.08)} initial="hidden" animate="show">
          {DEGREES.map((item, index) => (
            <motion.li
              key={item.bold}
              className={`xp-timeline__item${index === 0 ? ' is-ongoing' : ''}`}
              variants={rise}
            >
              <span className="xp-timeline__marker" aria-hidden="true">
                <i className={item.icon} />
              </span>
              <div className="xp-timeline__card">
                <div className="xp-timeline__meta">
                  <span className="xp-timeline__period">{item.label}</span>
                  {index === 0 && <span className="xp-timeline__now">In progress</span>}
                </div>
                <p className="xp-timeline__title">{item.bold}</p>
                {item.title && <p className="xp-timeline__desc">{cleanTitle(item.title)}</p>}
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      <section>
        <h3 className="tab-heading">
          <i className="fa-solid fa-chalkboard-user" aria-hidden="true" />
          Training & programmes
          <span className="tab-heading__count">{TRAINING.length}</span>
        </h3>
        <motion.ul className="hack-grid" variants={stagger(0.06, 0.15)} initial="hidden" animate="show">
          {TRAINING.map((item) => (
            <motion.li key={item.bold} className="edu-card" variants={rise}>
              <span className="edu-card__icon" aria-hidden="true">
                <i className={item.icon} />
              </span>
              <div className="edu-card__body">
                <span className="hack-card__event">{item.label}</span>
                <p className="hack-card__project">{cleanTitle(item.title)}</p>
                <p className="edu-card__school">{item.bold}</p>
                {item.link && <CertificateLink href={item.link} label={item.bold} compact />}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </section>

      <section>
        <h3 className="tab-heading">
          <i className="fa-solid fa-certificate" aria-hidden="true" />
          Certifications
          <span className="tab-heading__count">{CERTIFICATIONS.length}</span>
        </h3>
        <motion.ul className="cert-grid" variants={stagger(0.05, 0.25)} initial="hidden" animate="show">
          {CERTIFICATIONS.map((cert) => (
            <motion.li key={cert.text} className="cert-card" variants={rise}>
              <span className="cert-card__ribbon" aria-hidden="true">
                <i className={AREA_ICONS[cert.area] ?? 'fa-solid fa-certificate'} />
              </span>
              <span className="cert-card__area">{cert.area}</span>
              <p className="cert-card__title">{cert.text}</p>
              <CertificateLink href={cert.link} label={cert.text} />
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </div>
  );
}
