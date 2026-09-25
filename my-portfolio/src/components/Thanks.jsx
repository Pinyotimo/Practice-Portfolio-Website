import { motion } from 'framer-motion';

export default function Thanks() {
  const styles = {
    page: {
      fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
      background: 'var(--bg-main)',
      color: 'var(--ink)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: 24,
    },
    card: {
      maxWidth: 460,
      padding: '48px 40px',
      background: 'var(--bg-panel)',
      border: '1px solid var(--hairline)',
      borderRadius: 8,
      boxShadow: '4px 4px 0 rgba(21,24,28,.06)',
    },
    check: {
      width: 56,
      height: 56,
      margin: '0 auto 24px',
      borderRadius: 6,
      background: 'var(--accent-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.6rem',
      color: 'var(--accent)',
      border: '1px solid var(--hairline)',
    },
    h1: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '1.7rem',
      fontWeight: 700,
      margin: '0 0 12px',
      color: 'var(--ink)',
    },
    p: {
      color: 'var(--ink-soft)',
      lineHeight: 1.75,
      marginBottom: 32,
    },
    kicker: {
      display: 'block',
      marginBottom: 16,
      color: 'var(--accent)',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '.78rem',
      fontWeight: 500,
    },
    btn: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '13px 26px',
      borderRadius: 3,
      border: '1px solid var(--ink)',
      background: 'var(--ink)',
      color: 'var(--bg-main)',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '.95rem',
    },
  };

  return (
    <div style={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={styles.card}
      >
        <span style={styles.kicker}>Message received</span>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.35, delay: 0.15, type: "spring", stiffness: 220 }}
          style={styles.check}
        >
          ✓
        </motion.div>
        <h1 style={styles.h1}>Message Sent</h1>
        <p style={styles.p}>Thanks for reaching out — I'll get back to you as soon as possible.</p>
        <a href="/" style={styles.btn}>← Back to portfolio</a>
      </motion.div>
    </div>
  );
}