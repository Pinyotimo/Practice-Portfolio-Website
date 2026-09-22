import { useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const educationItems = [
  { label: "2024 – 2028", title: "BSc Computer Science — ", bold: "The Co-operative University of Kenya" },
  { label: "December 2025", title: "AI for Software Development Training — ", bold: "Moringa School", link: "/Images/Moringa AI course certificate.pdf" },
  { label: "Nov 2025", title: "Web Development Bootcamp — ", bold: "eMobilis Technology Training Institute" },
  { label: "Sep 2025 – Jan 2026", title: "Huawei Certified ICT Associate (HCIA) — ", bold: "Huawei Kenya" },
  { label: "Sep – Dec 2024", title: "Digital Safety & Security Awareness — ", bold: "Cisco Networking Academy", link: "/Images/Digital_Safety_and_Security_Awareness_certificate_steveotieno2012005-gmail-com_2726ea6b-fe42-4882-9c63-3cf4db38f68d.pdf" },
  { label: "2025", title: "Aspire Leaders Program — ", bold: "Aspire Institute", link: "/Images/Aspire Institute Badge.pdf" },
  { label: "Jan 2020 – Nov 2023", title: "", bold: "Sawagongo National School" },
];

const certItems = [
  { label: "Networking", text: "Network Technician Career Path ", link: "/Images/Network_Technician_Career_Path_certificate_steveotieno2012005-gmail-com_533a845c-5571-4797-b1d4-96ac69b89c91 (1).pdf" },
  { label: "Cybersecurity", text: "Commonwealth Introduction to Cybersecurity ", link: "/Images/Common Wealth Introduction to Cybersecurity Cert.pdf" },
  { label: "Data Analytics", text: "Data Analytics Certificate ", link: "/Images/Data Analytics Certificate.pdf" },
  { label: "Digital Literacy", text: "Disinformation and Misinformation Certification ", link: "/Images/Disinformation Misinformation Certification.pdf" },
  { label: "Digital Skills", text: "DDCN Certificate ", link: "/Images/DDCN cert.pdf" },
  { label: "Learn-A-Thon 2025", text: "Learn-A-Thon Certificate ", link: "/Images/Learn-A-Thon_2025_certificate_steveotieno2012005-gmail-com_.pdf" },
];

export default function EducationTab() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const styles = {
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    heading: {
      color: "var(--ink)",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: isMobile ? "1.1rem" : "1.2rem",
      fontWeight: 700,
      margin: "32px 0 16px 0",
      paddingTop: "16px",
      borderTop: "1px solid var(--hairline)",
    },
    item: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "baseline",
      gap: isMobile ? 8 : 16,
      marginBottom: "20px",
      color: "var(--ink-soft)",
      fontSize: isMobile ? "0.95rem" : "1rem",
      lineHeight: 1.6,
    },
    tag: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg-panel)",
      color: "var(--accent)",
      border: "1px solid var(--hairline)",
      padding: "4px 10px",
      borderRadius: 4,
      fontSize: "0.85rem",
      fontWeight: 500,
      fontFamily: "'IBM Plex Mono', monospace",
      whiteSpace: "nowrap",
      flexShrink: 0,
      minWidth: isMobile ? "auto" : "160px", 
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    boldText: {
      color: "var(--ink)",
      fontWeight: 600,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <motion.ul
      style={styles.list}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Education Section */}
      {educationItems.map((item, index) => (
        <motion.li key={`edu-${index}`} style={styles.item} variants={itemVariants}>
          <span style={styles.tag}>{item.label}</span>
          <div style={styles.contentWrapper}>
            <div>
              {item.title}
              <strong style={styles.boldText}>{item.bold}</strong>
            </div>
            {item.link && <CertificateLink href={item.link} />}
          </div>
        </motion.li>
      ))}

      {/* Certifications Section */}
      <motion.li style={styles.heading} variants={itemVariants}>
        Additional Certifications
      </motion.li>

      {certItems.map((item, index) => (
        <motion.li key={`cert-${index}`} style={styles.item} variants={itemVariants}>
          <span style={styles.tag}>{item.label}</span>
          <div style={styles.contentWrapper}>
            <div>{item.text}</div>
            <CertificateLink href={item.link} />
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}

// Sub-component to handle individual hover states for the certificate buttons cleanly
function CertificateLink({ href }) {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.85rem",
    color: isHovered ? "var(--ink)" : "var(--accent)",
    textDecoration: "none",
    fontWeight: 500,
    marginTop: "2px",
    transition: "color 0.2s ease",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <i className="fa-solid fa-certificate" aria-hidden="true"></i> View Certificate
    </a>
  );
}