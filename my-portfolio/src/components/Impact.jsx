import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import StatTile from './charts/StatTile';
import TimelineChart from './charts/TimelineChart';
import StackChart from './charts/StackChart';
import CategoryBarChart from './charts/CategoryBarChart';
import { ALL_CERTIFICATES, CERT_AREAS, EXPERIENCE, HACKATHONS, PROJECTS } from '../data/portfolio';
import './Impact.css';

/* Every figure is counted from the data the rest of the page renders, so
   the section can never drift out of step with it. */
const live = PROJECTS.filter((p) => p.href).length;
const placed = HACKATHONS.filter((h) => h.result);
const ongoing = EXPERIENCE.filter((e) => e.ongoing).length;

const STATS = [
  {
    value: PROJECTS.length,
    label: 'Projects built',
    note: `${live} live or open source — web, AI, automation and infrastructure`,
    icon: 'fa-solid fa-rocket',
  },
  {
    value: HACKATHONS.length,
    label: 'Hackathon builds',
    note: placed.length
      ? `${placed.map((h) => h.result).join(' and ')} — ${placed.length} placed`
      : 'Built under time pressure, end to end',
    icon: 'fa-solid fa-trophy',
  },
  {
    value: ALL_CERTIFICATES.length,
    label: 'Certifications',
    note: `Across ${CERT_AREAS.length} areas`,
    icon: 'fa-solid fa-certificate',
  },
  {
    value: EXPERIENCE.length,
    label: 'Roles & engagements',
    note: `${ongoing} ongoing — internships, freelance, hackathons and roles`,
    icon: 'fa-solid fa-briefcase',
  },
];

export default function Impact() {
  return (
    <motion.section
      id="impact"
      className="section"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">By the numbers</span>
            <h2 className="section-head__title">Track record</h2>
          </div>
          <p className="section-head__lede">
            Everything below comes from the roles, projects and certificates
            listed on this site — no estimates, no rounding in my favour.
          </p>
        </div>

        <div className="stat-row">
          {STATS.map((stat, index) => (
            <StatTile key={stat.label} index={index} {...stat} />
          ))}
        </div>

        <div className="impact__charts">
          <TimelineChart />

          <div className="impact__pair">
            <StackChart />
            <CategoryBarChart />
          </div>
        </div>

        <p className="impact__note">
          <i className="fa-solid fa-circle-info" aria-hidden="true" />
          Each chart can be switched to a table — every value is readable
          without hovering anything.
        </p>
      </div>
    </motion.section>
  );
}
