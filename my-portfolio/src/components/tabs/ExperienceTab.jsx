import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const experiences = [
  {
    period: "May 2026 – August 2026",
    role: "Hackathon Runner-Up",
    company: "Davis & Shirtliff",
    desc: "Built SmartAuction B2B (React, TypeScript, TanStack Query, Zustand, Socket.IO)."
  },
  {
    period: "September 2026",
    role: "Finalist",
    company: "5th Annual Kilimani Urban Hackathon",
    desc: "Developed KiliPlanner: live reporting map using React, Leaflet, and Supabase."
  },
  {
    period: "March 2026 – Present",
    role: "Web Developer",
    company: "SkillyMe Africa",
  },
  {
    period: "Jan 2026 – March 2026",
    role: "AI Technical Writing Intern",
    company: "GAO TEK",
  },
  {
    period: "Nov 2025 – Dec 2025",
    role: "Freelance Developer",
    company: "Property Hub Website",
  }
];

export default function ExperienceTab() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const styles = {
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
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
      minWidth: isMobile ? "auto" : "190px", 
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    },
    roleText: {
      color: "var(--ink)",
    },
    companyText: {
      color: "var(--ink)",
      fontWeight: 600,
    },
    descText: {
      margin: 0,
      fontSize: "0.9rem",
      fontStyle: "italic",
      opacity: 0.85,
    }
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
      {experiences.map((exp, index) => (
        <motion.li key={`exp-${index}`} style={styles.item} variants={itemVariants}>
          <span style={styles.tag}>{exp.period}</span>
          <div style={styles.contentWrapper}>
            <div>
              <span style={styles.roleText}>{exp.role}</span> at <strong style={styles.companyText}>{exp.company}</strong>
            </div>
            {exp.desc && (
              <p style={styles.descText}>{exp.desc}</p>
            )}
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}