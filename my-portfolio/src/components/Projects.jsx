import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <motion.section 
      id="portfolio"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container">
        <h2 className="sub-title">My Projects</h2>
        <div className="work-list">
          
          {/* SmartAuction B2B */}
          <motion.div 
            className="work"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <img src="/Images/pexels-fox-58267-969462.jpg" alt="SmartAuction B2B" />
            <div className="layer">
              <h3>SmartAuction B2B</h3>
              <p>B2B auction platform built with React, TypeScript, TanStack Query, Zustand, and Socket.IO for Davis &amp; Shirtliff. Runners-up at the hackathon.</p>
              <a href="https://auction.dayliff.com/" target="_blank" rel="noopener noreferrer" aria-label="View SmartAuction live">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </motion.div>

          {/* KiliPlanner */}
          <motion.div 
            className="work"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <img src="/Images/pexels-tranmautritam-251225.jpg" alt="KiliPlanner" />
            <div className="layer">
              <h3>KiliPlanner</h3>
              <p>Live, anonymous map for reporting infrastructure and environmental issues in Kilimani Ward, Nairobi. Built with React, Leaflet, and Supabase.</p>
              <a href="https://kiliplanner1.vercel.app/" target="_blank" rel="noopener noreferrer" aria-label="View KiliPlanner live">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </motion.div>

          {/* ELDEC Limited Components */}
          <motion.div 
            className="work"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <img src="/Images/pexels-tima-miroshnichenko-5380642.jpg" alt="ELDEC Limited" />
            <div className="layer">
              <h3>ELDEC Limited Components</h3>
              <p>React page components built for ELDEC Limited, an electrical and ELV consultancy site showcasing professional engineering solutions.</p>
              <a href="https://eldecengineering.com/" target="_blank" rel="noopener noreferrer" aria-label="View ELDEC Limited live">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </motion.div>

          {/* Pharmacy Management System */}
          <motion.div 
            className="work"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <img src="/Images/pexels-fox-58267-969462.jpg" alt="Pharmacy Management System" />
            <div className="layer">
              <h3>Pharmacy Management System</h3>
              <p>Collaborated with my team to build a fully functional pharmacy management platform with shopping cart and responsive design.</p>
              <a href="https://pharmaos-app.netlify.app" target="_blank" rel="noopener noreferrer" aria-label="View Pharmacy Management System live">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </motion.div>

          {/* Portfolio Website */}
          <motion.div 
            className="work"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <img src="/Images/pexels-tranmautritam-251225.jpg" alt="Portfolio Website" />
            <div className="layer">
              <h3>Portfolio Website</h3>
              <p>A personal portfolio built from scratch using HTML, CSS, and modern UI design principles.</p>
              <a href="https://github.com/Pinyotimo/Practice-Portfolio-Website" target="_blank" rel="noopener noreferrer" aria-label="View Portfolio Website on GitHub">
                <i className="fa-brands fa-github" aria-hidden="true"></i>
              </a>
            </div>
          </motion.div>

          {/* Modern HR Management System */}
          <motion.div 
            className="work"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <img src="/Images/pexels-tima-miroshnichenko-5380642.jpg" alt="Modern HR Management System" />
            <div className="layer">
              <h3>Modern HR Management System</h3>
              <p>A comprehensive HR solution with employee records, attendance tracking, and performance evaluation features.</p>
              <a href="https://oduor.wuaze.com/index.php" target="_blank" rel="noopener noreferrer" aria-label="View HR Management System live">
                <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}