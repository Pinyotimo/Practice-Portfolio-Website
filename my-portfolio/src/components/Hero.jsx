import { motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const styles = {
    hero: {
      width: isTablet ? '100%' : 'min(1180px, calc(100% - 40px))',
      minHeight: isTablet ? 'auto' : 'calc(100vh - 90px)',
      margin: '0 auto',
      padding: isMobile ? '26px 16px 30px' : isTablet ? '40px 26px' : '56px 48px',
      display: 'grid',
      gridTemplateColumns: isTablet ? '1fr' : 'minmax(min(260px,100%), 380px) minmax(min(320px,100%), 1fr)',
      gap: isTablet ? '32px' : '56px',
      alignItems: 'center',
    },
    profileImg: {
      width: '100%',
      maxWidth: isMobile ? 260 : 380,
      aspectRatio: '1 / 1',
      margin: '0 auto',
      objectFit: 'cover',
      objectPosition: 'center top',
      borderRadius: 28,
      border: '1px solid var(--hairline-strong)',
      boxShadow: '4px 4px 0 rgba(21,24,28,.06)',
      display: 'block',
    },
    heroRight: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: isTablet ? 'center' : 'flex-start',
      textAlign: isTablet ? 'center' : 'left',
    },
    heroContent: { maxWidth: 590 },
    kicker: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      margin: isTablet ? '0 auto 18px' : '0 0 18px',
      padding: '6px 0',
      color: 'var(--accent)',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '.82rem',
      fontWeight: 500,
      borderBottom: '1px solid var(--hairline)',
      justifyContent: isTablet ? 'center' : 'flex-start',
    },
    h1: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: 'clamp(2rem, 4.5vw + .5rem, 3.6rem)',
      lineHeight: 1.08,
      margin: '0 0 20px',
      color: 'var(--ink)',
    },
    highlight: { color: 'var(--accent)' },
    p: {
      maxWidth: 540,
      margin: isTablet ? '0 auto 32px' : '0 0 32px',
      color: 'var(--ink-soft)',
      fontSize: '1.06rem',
      lineHeight: 1.75,
    },
    actions: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 14,
      justifyContent: isTablet ? 'center' : 'flex-start',
    },
    btn: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      minHeight: 46,
      padding: '12px 26px',
      border: '1px solid var(--ink)',
      borderRadius: 3,
      background: 'var(--ink)',
      color: 'var(--bg-main)',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '.98rem',
    },
    btnOutline: {
      background: 'transparent',
      borderColor: 'var(--hairline-strong)',
      color: 'var(--ink)',
    },
  };

  return (
    <motion.section
      style={styles.hero}
      id="home"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <motion.img
          src="/Images/profile-photo.jpg"
          alt="Stephen Oduor"
          style={styles.profileImg}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        />
      </div>

      <div style={styles.heroRight}>
        <div style={styles.heroContent}>
          <span style={styles.kicker}>Nairobi, Kenya — Full-stack Engineer</span>
          <h1 style={styles.h1}>Hi, I'm <span style={styles.highlight}>Steve</span></h1>
          <p style={styles.p}>
            I build full-stack web platforms — React and Node on the front and
            back, Postgres and Redis underneath, Socket.IO when things need to
            happen in real time. Recent work: a civic-reporting platform for
            Kilimani Ward and an SMS/USSD event assistant built at a Nairobi hackathon.
          </p>
          <div style={styles.actions}>
            <a href="#portfolio" style={styles.btn}>View my work</a>
            <a href="/Images/Stephen-Oduor-CV.pdf" download style={{ ...styles.btn, ...styles.btnOutline }}>
              <i className="fa-solid fa-download" aria-hidden="true" style={{ marginRight: 4 }}></i> Download CV
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}