import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import StatTile from './charts/StatTile';
import TimelineChart from './charts/TimelineChart';
import StackChart from './charts/StackChart';
import CategoryBarChart from './charts/CategoryBarChart';
import './Impact.css';

const STATS = [
  {
    value: '6',
    label: 'Projects shipped',
    note: 'Live, linked, and still running',
    icon: 'fa-solid fa-rocket',
  },
  {
    value: '2',
    label: 'Hackathon podiums',
    note: 'Runner-up and finalist',
    icon: 'fa-solid fa-trophy',
  },
  {
    value: '9',
    label: 'Certifications',
    note: 'Across five disciplines',
    icon: 'fa-solid fa-certificate',
  },
  {
    value: '5',
    label: 'Roles & engagements',
    note: 'Internships, freelance and full-time',
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
          {STATS.map((stat) => (
            <StatTile key={stat.label} {...stat} />
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
