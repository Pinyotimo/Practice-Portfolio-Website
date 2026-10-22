import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { SERVICES } from '../data/portfolio';
import './Services.css';

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

export default function Services() {
  return (
    <motion.section
      id="services"
      className="section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">What I do</span>
            <h2 className="section-head__title">My services</h2>
          </div>
          <p className="section-head__lede">
            The work I take on, and what I bring to it. Most engagements start
            with a build; the ones I enjoy most keep going afterwards.
          </p>
        </div>

        <motion.ul className="services__grid" variants={containerVariants}>
          {SERVICES.map((service, index) => (
            <motion.li
              key={service.id}
              className="service-card"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.22, ease: EASE }}
            >
              <span className="service-card__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>

              <span className="service-card__icon" aria-hidden="true">
                <i className={service.icon} />
              </span>

              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.desc}</p>

              <span className="service-card__rule" aria-hidden="true" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
}
