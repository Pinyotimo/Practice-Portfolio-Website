import { motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { CERTIFICATIONS, EDUCATION } from '../../data/portfolio';
import './Tabs.css';

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function EducationTab() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show">
      <ul className="detail-list">
        {EDUCATION.map((item) => (
          <motion.li key={item.label} className="detail-list__item" variants={itemVariants}>
            <span className="detail-list__tag">{item.label}</span>
            <span className="detail-list__body">
              <span className="detail-list__title">
                {item.title}
                <strong>{item.bold}</strong>
              </span>
              {item.link && <CertificateLink href={item.link} label={item.bold} />}
            </span>
          </motion.li>
        ))}
      </ul>

      <h3 className="detail-list__heading detail-list__group">Additional certifications</h3>
      <ul className="detail-list">
        {CERTIFICATIONS.map((item) => (
          <motion.li key={item.text} className="detail-list__item" variants={itemVariants}>
            <span className="detail-list__tag">{item.label}</span>
            <span className="detail-list__body">
              <span className="detail-list__title">{item.text}</span>
              <CertificateLink href={item.link} label={item.text} />
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function CertificateLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-link"
      aria-label={`View the ${label} certificate (opens in a new tab)`}
    >
      <i className="fa-solid fa-certificate" aria-hidden="true" />
      View certificate
    </a>
  );
}
