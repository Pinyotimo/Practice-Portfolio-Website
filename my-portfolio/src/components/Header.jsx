import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Animation variants for the navigation links
  const navVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <motion.header 
      id="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <nav>
          <motion.a 
            href="#home" 
            className="logo" 
            aria-label="Go to homepage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="logo-mark">SO</span>
            <span className="logo-text">Stephen Oduor</span>
          </motion.a>
          
          <button 
            className={`nav-toggle ${isOpen ? 'active' : ''}`} 
            id="navToggle" 
            aria-label="Toggle navigation" 
            aria-expanded={isOpen} 
            type="button"
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
          
          <motion.ul 
            id="navLinks" 
            className={isOpen ? 'open' : ''}
            variants={navVariants}
            initial="hidden"
            animate="show"
          >
            {/* Generated links dynamically to apply the staggered animation cleanly */}
            {[
              { name: 'Home', href: '#home' },
              { name: 'About', href: '#about' },
              { name: 'Services', href: '#services' },
              { name: 'Projects', href: '#portfolio' },
              { name: 'Contact', href: '#contact' }
            ].map((link) => (
              <motion.li key={link.name} variants={linkVariants}>
                <a href={link.href} onClick={closeMenu}>{link.name}</a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </div>
    </motion.header>
  );
}