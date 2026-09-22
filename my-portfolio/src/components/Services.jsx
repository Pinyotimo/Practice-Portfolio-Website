import { motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

const servicesData = [
  { id: 1, icon: "fa-solid fa-code", title: "Web Development", desc: "Building highly responsive, fast, and secure websites from scratch using modern frameworks and clean code." },
  { id: 2, icon: "fa-solid fa-crop-simple", title: "UI/UX Design", desc: "Designing intuitive, beautiful user interfaces that provide seamless and engaging digital experiences." },
  { id: 3, icon: "fa-brands fa-app-store", title: "App Design", desc: "Creating functional and aesthetically pleasing mobile application layouts for iOS and Android platforms." },
  { id: 4, icon: "fa-solid fa-robot", title: "AI Data Support", desc: "Preparing and labeling datasets for model training workflows using tools like Roboflow, Labelbox, and Label Prism." },
  { id: 5, icon: "fa-solid fa-shop", title: "E-commerce Support", desc: "Setting up and improving online storefront workflows with Shopify and related web commerce tools." },
  { id: 6, icon: "fa-solid fa-shield-halved", title: "Cybersecurity Basics", desc: "Applying networking fundamentals, security awareness, and beginner pentesting concepts to safer web systems." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12 } },
};

export default function Services() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const styles = {
    section: { padding: isMobile ? '44px 0 18px' : '100px 0 40px' },
    container: { width: 'min(1120px, 90%)', margin: '0 auto' },
    subTitle: {
      margin: '0 0 24px',
      color: 'var(--ink)',
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: 'clamp(1.8rem, 2.6vw + .8rem, 2.8rem)',
      lineHeight: 1.1,
    },
    list: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px,1fr))',
      gap: isMobile ? 1 : 1,
      marginTop: isMobile ? 24 : 46,
      background: 'var(--hairline)',
      border: '1px solid var(--hairline)',
    },
    card: {
      minHeight: isMobile ? 'auto' : 240,
      padding: isMobile ? '18px' : '32px 28px',
      background: 'var(--bg-panel)',
      display: isMobile ? 'grid' : 'block',
      gridTemplateColumns: isMobile ? 'auto 1fr' : undefined,
      columnGap: isMobile ? 16 : undefined,
      alignItems: isMobile ? 'start' : undefined,
    },
    icon: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isMobile ? 46 : 48,
      height: isMobile ? 46 : 48,
      marginBottom: isMobile ? 4 : 22,
      borderRadius: 3,
      border: '1px solid var(--hairline-strong)',
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      color: 'var(--accent)',
      gridRow: isMobile ? 'span 2' : undefined,
    },
    title: {
      margin: isMobile ? '0 0 2px' : '0 0 12px',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: isMobile ? '1.18rem' : '1.4rem',
      fontWeight: 700,
      color: 'var(--ink)',
    },
    desc: {
      color: 'var(--ink-soft)',
      lineHeight: 1.75,
      fontSize: isMobile ? '.94rem' : '.96rem',
      maxWidth: '34rem',
      margin: 0,
    },
  };

  return (
    <section id="services" style={styles.section}>
      <div style={styles.container}>
        <motion.h2
          style={styles.subTitle}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          My Services
        </motion.h2>

        <motion.div
          style={styles.list}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              style={styles.card}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow: "0px 12px 24px rgba(41, 84, 166, 0.18)",
                transition: { duration: 0.3 },
              }}
            >
              <i className={service.icon} style={styles.icon} aria-hidden="true"></i>
              <h3 style={styles.title}>{service.title}</h3>
              <p style={styles.desc}>{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}