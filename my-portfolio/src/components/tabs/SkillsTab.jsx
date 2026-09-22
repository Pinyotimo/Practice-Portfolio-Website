import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const skills = [
  { title: "UI/UX Design", desc: "Designing intuitive Web & App interfaces" },
  { title: "Web Development", desc: "Building responsive web applications" },
  { title: "Software Engineering", desc: "Writing scalable and clean code" },
  { title: "Virtual Assistance", desc: "Supporting digital workflows, research, scheduling, documentation, and online task management" },
  { title: "AI Data Annotation", desc: "Training computer vision and AI models using Roboflow, Labelbox, and Label Prism" },
  { title: "E-commerce Tools", desc: "Building and managing web stores with tools such as Shopify" },
  { title: "Networking", desc: "Understanding network fundamentals, connectivity, troubleshooting, and secure system communication" },
  { title: "Cybersecurity Basics", desc: "Practicing foundational security awareness, vulnerability thinking, and beginner pentesting concepts" }
];

export default function SkillsTab() {
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
      gap: isMobile ? 6 : 16,
      marginBottom: "16px",
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
      minWidth: isMobile ? "auto" : "180px", // Keeps titles aligned on desktop
    },
    desc: {
      margin: 0,
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
      {skills.map((skill, index) => (
        <motion.li key={`skill-${index}`} style={styles.item} variants={itemVariants}>
          <span style={styles.tag}>{skill.title}</span>
          <span style={styles.desc}>{skill.desc}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}