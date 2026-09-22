import { useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "../hooks/useMediaQuery";

const SOCIAL_LINKS = [
  { id: "linkedin", href: "https://www.linkedin.com/in/stephen-oduor-8817992b9", icon: "fa-brands fa-linkedin", label: "LinkedIn" },
  { id: "github", href: "https://github.com/Pinyotimo", icon: "fa-brands fa-github", label: "GitHub" },
  { id: "twitter", href: "https://twitter.com/Pinyotimoburu", icon: "fa-brands fa-twitter", label: "X / Twitter" },
  { id: "facebook", href: "https://www.facebook.com/Steve%20Otieno", icon: "fa-brands fa-facebook", label: "Facebook" },
  { id: "instagram", href: "https://www.instagram.com/steveotieno858/", icon: "fa-brands fa-instagram", label: "Instagram" },
  { id: "tiktok", href: "https://www.tiktok.com/@otieno_oduor1", icon: "fa-brands fa-tiktok", label: "TikTok" },
  { id: "reddit", href: "https://www.reddit.com/user/Pinyotimoburu", icon: "fa-brands fa-reddit", label: "Reddit" },
];

export default function Contact() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  const styles = {
    section: { padding: isMobile ? "44px 0 18px" : "100px 0 40px" },
    container: { width: "min(1120px, 90%)", margin: "0 auto" },
    row: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      justifyContent: "space-between",
      gap: isMobile ? 48 : 60,
    },
    contactLeft: { flexBasis: isMobile ? "100%" : "35%" },
    contactRight: { flexBasis: isMobile ? "100%" : "60%" },
    subTitle: {
      margin: "0 0 24px",
      color: "var(--ink)",
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: "clamp(1.8rem, 2.6vw + .8rem, 2.8rem)",
      lineHeight: 1.1,
    },
    contactDetail: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      margin: "18px 0",
      fontSize: isMobile ? "1rem" : "1.05rem",
      color: "var(--ink-soft)",
    },
    contactIcon: {
      color: "var(--accent)",
      fontSize: "1.2rem",
      width: 24,
      textAlign: "center",
    },
    contactLink: {
      color: "inherit",
      textDecoration: "none",
      transition: "color 0.2s ease",
    },
    socialIcons: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap",
      marginTop: 32,
      marginBottom: 32,
    },
    socialLink: (isHovered) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 42,
      height: 42,
      borderRadius: "50%",
      background: isHovered ? "var(--accent)" : "var(--bg-panel)",
      color: isHovered ? "#fff" : "var(--ink)",
      textDecoration: "none",
      fontSize: "1.2rem",
      border: "1px solid var(--hairline)",
      transition: "all 0.25s ease",
    }),
    btn: (isHovered) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      background: isHovered ? "var(--ink)" : "var(--accent)",
      color: "#fff",
      padding: isMobile ? "14px 24px" : "16px 32px",
      fontSize: "1rem",
      borderRadius: 6,
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
      fontWeight: 500,
      transition: "background-color 0.25s ease",
      fontFamily: "inherit",
      width: isMobile ? "100%" : "max-content",
    }),
    form: {
      display: "flex",
      flexDirection: "column",
      gap: 16,
    },
    input: {
      width: "100%",
      padding: "16px",
      background: "var(--bg-panel)",
      color: "var(--ink)",
      border: "1px solid var(--hairline)",
      borderRadius: 6,
      fontSize: "1rem",
      fontFamily: "inherit",
      outline: "none",
    },
    textarea: {
      width: "100%",
      padding: "16px",
      background: "var(--bg-panel)",
      color: "var(--ink)",
      border: "1px solid var(--hairline)",
      borderRadius: 6,
      fontSize: "1rem",
      fontFamily: "inherit",
      outline: "none",
      resize: "vertical",
      minHeight: "160px",
    },
  };

  return (
    <motion.section
      id="contact"
      style={styles.section}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div style={styles.container}>
        <div style={styles.row}>
          {/* Left Column */}
          <motion.div
            style={styles.contactLeft}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <h2 style={styles.subTitle}>Contact Me</h2>
            
            <p style={styles.contactDetail}>
              <i className="fa-solid fa-envelope" style={styles.contactIcon} aria-hidden="true"></i>
              <a href="mailto:steveotieno2012005@gmail.com" style={styles.contactLink}>
                steveotieno2012005@gmail.com
              </a>
            </p>
            
            <p style={styles.contactDetail}>
              <i className="fa-solid fa-phone" style={styles.contactIcon} aria-hidden="true"></i>
              <a href="tel:+254769493697" style={styles.contactLink}>
                +254 769 493 697
              </a>
            </p>
            
            <p style={styles.contactDetail}>
              <i className="fa-brands fa-whatsapp" style={styles.contactIcon} aria-hidden="true"></i>
              <a
                href="https://wa.me/254750779480"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.contactLink}
              >
                +254 750 779 480
              </a>
            </p>
            
            <p style={styles.contactDetail}>
              <i className="fa-solid fa-location-dot" style={styles.contactIcon} aria-hidden="true"></i>
              Nairobi, Kenya
            </p>

            <div style={styles.socialIcons}>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={styles.socialLink(hoveredSocial === social.id)}
                  onMouseEnter={() => setHoveredSocial(social.id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <i className={social.icon} aria-hidden="true"></i>
                </a>
              ))}
            </div>

            <a
              href="/Images/Stephen-Oduor-CV.pdf"
              download
              style={styles.btn(hoveredBtn === "cv")}
              onMouseEnter={() => setHoveredBtn("cv")}
              onMouseLeave={() => setHoveredBtn(null)}
            >
              <i className="fa-solid fa-download" aria-hidden="true"></i> Download CV
            </a>
          </motion.div>

          {/* Right Column */}
          <motion.div
            style={styles.contactRight}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <form
              action="https://formsubmit.co/steveotieno2012005@gmail.com"
              method="POST"
              style={styles.form}
            >
              <input type="hidden" name="_subject" value="Portfolio Website Message" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://stephen-oduor-portfolio-website.vercel.app/thanks" />

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                autoComplete="name"
                style={styles.input}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                autoComplete="email"
                style={styles.input}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                required
                style={styles.textarea}
              ></textarea>
              
              <button
                type="submit"
                style={styles.btn(hoveredBtn === "submit")}
                onMouseEnter={() => setHoveredBtn("submit")}
                onMouseLeave={() => setHoveredBtn(null)}
              >
                <i className="fa-solid fa-paper-plane" aria-hidden="true"></i> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}