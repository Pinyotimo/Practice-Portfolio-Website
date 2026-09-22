import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section 
      className="hero" 
      id="home"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="hero-left"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <img src="/Images/logo.png" alt="Stephen Oduor" className="profile-img" />
      </motion.div>

      <motion.div 
        className="hero-right"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
      >
        <div className="hero-content">
          <span className="hero-kicker">Software Engineer &amp; Digital Solutions Builder</span>
          <h2>Hi, I'm <span className="highlight">Steve</span></h2>
          <p>A passionate Web Developer &amp; Designer building modern, responsive web experiences from Nairobi, Kenya.</p>
          <div className="hero-actions">
            <a href="#portfolio" className="btn">View My Work</a>
            <a href="/Images/Stephen-Oduor-CV.pdf" download className="btn btn-outline">
              <i className="fa-solid fa-download" aria-hidden="true"></i> Download CV
            </a>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}