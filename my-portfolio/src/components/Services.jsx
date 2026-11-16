import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { SERVICES } from '../data/portfolio';
import SectionDecor from './section-decor';
import './Services.css';

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export default function Services() {
  return (
    <section id="services" className="section services">
      <SectionDecor variant="pool" />
      <div className="container container--wide">
        <motion.div
          className="section-head"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div>
            <span className="kicker">What I do</span>
            <h2 className="section-head__title">My services</h2>
          </div>
          <p className="section-head__lede">
            Seven areas I take work in — from shipping a full-stack product to
            securing it, keeping its servers running and wiring up the network
            underneath.
          </p>
        </motion.div>

        <motion.ul
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((service, index) => (
            <motion.li
              key={service.id}
              className={`service-card card${service.featured ? ' service-card--featured' : ''}`}
              variants={cardVariants}
            >
              <span className="service-card__glow" aria-hidden="true" />

              <div className="service-card__top">
                <span className="service-card__icon" aria-hidden="true">
                  <i className={service.icon} />
                </span>
                <span className="service-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="service-card__body">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.desc}</p>
              </div>

              {service.tools?.length > 0 && (
                <ul className="service-card__tools" aria-label={`${service.title} tools`}>
                  {service.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
