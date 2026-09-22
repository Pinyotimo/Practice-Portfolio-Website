import { motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

export default function Footer() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const styles = {
    footer: {
      padding: isMobile ? '24px 0' : '32px 0',
      textAlign: 'center',
      borderTop: '1px solid var(--hairline)',
      background: 'var(--bg-main)',
    },
    text: {
      color: 'var(--ink-soft)',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      margin: 0,
      fontWeight: 500,
    }
  };

  return (
    <motion.footer 
      style={styles.footer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <div className="container">
        <p style={styles.text}>&copy; 2026 Stephen Oduor. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}