import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      className="site-footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <div className="container">
        <p>&copy; 2026 Stephen Oduor. All rights reserved.</p>
      </div>
    </motion.footer>
  );
}