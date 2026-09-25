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

const CONTACT_DETAILS = [
  { icon: "fa-solid fa-envelope", label: "Email", value: "steveotieno2012005@gmail.com", href: "mailto:steveotieno2012005@gmail.com" },
  { icon: "fa-solid fa-phone", label: "Phone", value: "+254 769 493 697", href: "tel:+254769493697" },
  { icon: "fa-brands fa-whatsapp", label: "WhatsApp", value: "+254 750 779 480", href: "https://wa.me/254750779480", external: true },
  { icon: "fa-solid fa-location-dot", label: "Location", value: "Nairobi, Kenya", href: null },
];

export default function Contact() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredBtn, setHoveredBtn] = useState(null);
  const [hoveredDetail, setHoveredDetail] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const styles = {
    section: { padding: isMobile ? "44px 0 18px" : "100px 0 40px" },
    container: { width: "min(1120px, 90%)", margin: "0 auto" },
    kicker: {
      display: "block",
      marginBottom: 8,
      color: "var(--accent)",
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: ".82rem",
      fontWeight: 500,
    },
    subTitle: {
      margin: "0 0 24px",
      color: "var(--ink)",
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: "clamp(1.8rem, 2.6vw + .8rem, 2.8rem)",
      lineHeight: 1.1,
    },
    row: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "stretch",
      gap: isMobile ? 20 : 24,
      marginTop: isMobile ? 24 : 40,
    },
    panel: {
      background: "var(--bg-panel)",
      border: "1px solid var(--hairline)",
      borderRadius: 8,
      padding: isMobile ? 22 : 36,
    },
    contactLeft: { flexBasis: isMobile ? "100%" : "38%" },
    contactRight: { flexBasis: isMobile ? "100%" : "62%" },
    detailRow: (isHovered) => ({
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 0",
      borderBottom: "1px solid var(--hairline)",
      fontSize: "1rem",
      color: isHovered ? "var(--accent)" : "var(--ink-soft)",
      transition: "color .2s ease",
    }),
    detailIcon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: 32,
      flexShrink: 0,
      borderRadius: 6,
      background: "var(--accent-soft)",
      color: "var(--accent)",
      fontSize: "1rem",
    },
    detailText: { display: "flex", flexDirection: "column", gap: 2, minWidth: 0 },
    detailLabel: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: ".7rem",
      color: "var(--ink-muted)",
      textTransform: "uppercase",
      letterSpacing: ".04em",
    },
    detailValue: { color: "inherit", textDecoration: "none", overflowWrap: "anywhere" },
    socialIcons: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24, marginBottom: 24 },
    socialLink: (isHovered) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      borderRadius: 6,
      background: isHovered ? "var(--accent)" : "var(--bg-main)",
      color: isHovered ? "#fff" : "var(--ink-soft)",
      textDecoration: "none",
      fontSize: "1.1rem",
      border: "1px solid var(--hairline)",
      transition: "background-color .2s ease, color .2s ease",
    }),
    btn: (isHovered) => ({
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      background: isHovered ? "var(--accent)" : "var(--ink)",
      color: "#fff",
      padding: isMobile ? "14px 24px" : "14px 28px",
      fontSize: ".98rem",
      fontWeight: 600,
      borderRadius: 6,
      textDecoration: "none",
      border: "none",
      cursor: "pointer",
      transition: "background-color .2s ease",
      fontFamily: "inherit",
      width: isMobile ? "100%" : "max-content",
    }),
    form: { display: "flex", flexDirection: "column", gap: 16 },
    fieldWrap: { display: "flex", flexDirection: isMobile ? "column" : "row", gap: 16 },
    field: (name) => ({
      width: "100%",
      padding: "14px 16px",
      background: "var(--bg-main)",
      color: "var(--ink)",
      border: `1px solid ${focusedField === name ? "var(--accent)" : "var(--hairline)"}`,
      borderRadius: 6,
      fontSize: "1rem",
      fontFamily: "inherit",
      outline: "none",
      transition: "border-color .15s ease",
    }),
    textarea: {
      width: "100%",
      padding: "14px 16px",
      background: "var(--bg-main)",
      color: "var(--ink)",
      border: `1px solid ${focusedField === "message" ? "var(--accent)" : "var(--hairline)"}`,
      borderRadius: 6,
      fontSize: "1rem",
      fontFamily: "inherit",
      outline: "none",
      resize: "vertical",
      minHeight: 160,
      transition: "border-color .15s ease",
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
        <span style={styles.kicker}>Get in touch</span>
        <h2 style={styles.subTitle}>Contact Me</h2>

        <div style={styles.row}>
          <motion.div
            style={{ ...styles.panel, ...styles.contactLeft }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            {CONTACT_DETAILS.map((detail) => {
              const body = (
                <>
                  <span style={styles.detailIcon}>
                    <i className={detail.icon} aria-hidden="true"></i>
                  </span>
                  <span style={styles.detailText}>
                    <span style={styles.detailLabel}>{detail.label}</span>
                    <span style={styles.detailValue}>{detail.value}</span>
                  </span>
                </>
              );
              return detail.href ? (
                /* Fixed line below: Added opening `<a` */
                <a
                  key={detail.label}
                  href={detail.href}
                  target={detail.external ? "_blank" : undefined}
                  rel={detail.external ? "noopener noreferrer" : undefined}
                  style={{ ...styles.detailRow(hoveredDetail === detail.label), textDecoration: "none" }}
                  onMouseEnter={() => setHoveredDetail(detail.label)}
                  onMouseLeave={() => setHoveredDetail(null)}
                >
                  {body}
                </a>
              ) : (
                <div key={detail.label} style={styles.detailRow(false)}>{body}</div>
              );
            })}

            <div style={styles.socialIcons}>
              {SOCIAL_LINKS.map((social) => (
                /* Fixed line below: Added opening `<a` */
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

            {/* Fixed line below: Added opening `<a` */}
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

          <motion.div
            style={{ ...styles.panel, ...styles.contactRight }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <form
              action="https://formsubmit.co/steveotieno2012005@gmail.com"
              method="POST"
              style={styles.form}
            >
              <input type="hidden" name="_subject" value="Portfolio Website Message" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_next"
                value="https://stephenoduor-software-developer-por.vercel.app/#contact"
              />

              <div style={styles.fieldWrap}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  autoComplete="name"
                  style={styles.field("name")}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  autoComplete="email"
                  style={styles.field("email")}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                required
                style={styles.textarea}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
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