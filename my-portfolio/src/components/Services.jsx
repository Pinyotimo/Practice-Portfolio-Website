import { motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

const servicesData = [
  { id: 1, icon: "fa-solid fa-code", title: "Web Development", desc: "Building highly responsive, fast, and secure websites from scratch using modern frameworks and clean code." },
  { id: 2, icon: "fa-solid fa-crop-simple", title: "UI/UX Design", desc: "Designing intuitive, beautiful user interfaces that provide seamless and engaging digital experiences." },
  { id: 3, icon: "fa-brands fa-app-store", title: "App Design", desc: "Creating functional and aesthetically pleasing mobile application layouts for iOS and Android platforms." },
  { id: 4, icon: "fa-solid fa-robot", title: "AI Data Support", desc: "Preparing and labeling datasets for model training workflows using tools like Roboflow, Labelbox, and Label Prism." },
  { id: 5, icon: "fa-solid fa-shop", title: "E-commerce Support", desc: "Setting up and improving online storefront workflows with Shopify and related web commerce tools." },
  { id: 6, icon: "fa-solid fa-shield-halved", title: "Cybersecurity Basics", desc: "Applying networking fundamentals, security awareness, and beginner pentesting concepts to safer web systems." },
  { id: 7, icon: "fa-solid fa-network-wired", title: "IT Support & Network Design", desc: "Technical support, troubleshooting, and network configuration and design — grounded in HCIA (Huawei Certified ICT Associate) training." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Services() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const styles = {
    section: { padding: isMobile ? '44px 0 18px' : '100px 0 40px' },
    container: { width: 'min(1120px, 90%)', margin: '0 auto' },
    subTitle: {
      margin: '0 0 8px',
      color: 'var(--ink)',
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: 'clamp(1.8rem, 2.6vw + .8rem, 2.8rem)',
      lineHeight: 1.1,
    },
    kicker: {
      display: 'block',
      marginBottom: 24,
      color: 'var(--accent)',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '.82rem',
      fontWeight: 500,
    },
    list: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(260px,1fr))',
      gap: isMobile ? 14 : 20,
      marginTop: isMobile ? 24 : 44,
    },
    card: {
      position: 'relative',
      overflow: 'hidden',
      minHeight: isMobile ? 'auto' : 250,
      padding: isMobile ? 20 : '34px 30px',
      background: 'var(--bg-panel)',
      border: '1px solid var(--hairline)',
      borderRadius: 8,
      display: isMobile ? 'grid' : 'block',
      gridTemplateColumns: isMobile ? 'auto 1fr' : undefined,
      columnGap: isMobile ? 16 : undefined,
      alignItems: isMobile ? 'start' : undefined,
      cursor: 'default',
    },
    index: {
      position: 'absolute',
      top: -6,
      right: 10,
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: '4.2rem',
      lineHeight: 1,
      color: 'var(--bg-panel-alt)',
      userSelect: 'none',
      pointerEvents: 'none',
      display: isMobile ? 'none' : 'block',
    },
    icon: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isMobile ? 44 : 52,
      height: isMobile ? 44 : 52,
      marginBottom: isMobile ? 4 : 20,
      borderRadius: 8,
      background: 'var(--accent-soft)',
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      color: 'var(--accent)',
      gridRow: isMobile ? 'span 2' : undefined,
    },
    title: {
      position: 'relative',
      margin: isMobile ? '0 0 2px' : '0 0 10px',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontWeight: 700,
      color: 'var(--ink)',
    },
    desc: {
      position: 'relative',
      color: 'var(--ink-soft)',
      lineHeight: 1.7,
      fontSize: isMobile ? '.92rem' : '.94rem',
      maxWidth: '34rem',
      margin: 0,
    },
    underline: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      height: 3,
      background: 'var(--accent)',
    },
  };

  return (
    <section id="services" style={styles.section}>
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span style={styles.kicker}>What I do</span>
          <h2 style={styles.subTitle}>My Services</h2>
        </motion.div>

        <motion.div
          style={styles.list}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {servicesData.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} styles={styles} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, styles }) {
  return (
    <motion.div
      style={styles.card}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <span style={styles.index}>{String(index + 1).padStart(2, '0')}</span>
      <i className={service.icon} style={styles.icon} aria-hidden="true"></i>
      <h3 style={styles.title}>{service.title}</h3>
      <p style={styles.desc}>{service.desc}</p>
      <motion.span
        style={styles.underline}
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
    </motion.div>
  );
}