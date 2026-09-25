import { useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const hobbies = [
  { title: "Travelling", desc: "Exploring new places, cultures, and perspectives across Kenya and beyond." },
  { title: "Reading", desc: "Tech books, biographies, and anything that sharpens thinking." },
  { title: "Swimming", desc: "A great way to stay active and clear the mind." },
];

export default function HobbiesTab() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [hovered, setHovered] = useState(null);

  const styles = {
    list: { listStyle: "none", padding: 0, margin: 0 },
    item: (isHovered) => ({
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "baseline",
      gap: isMobile ? 6 : 16,
      padding: "12px 14px",
      marginBottom: 2,
      borderLeft: `2px solid ${isHovered ? "var(--accent)" : "transparent"}`,
      background: isHovered ? "var(--accent-soft)" : "transparent",
      color: "var(--ink-soft)",
      fontSize: isMobile ? "0.95rem" : "1rem",
      lineHeight: 1.6,
      transition: "background-color .15s ease, border-color .15s ease",
    }),
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
      minWidth: isMobile ? "auto" : "120px",
    },
    desc: { margin: 0 },
  };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, x: -15 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } };

  return (
    <motion.ul style={styles.list} variants={containerVariants} initial="hidden" animate="show">
      {hobbies.map((hobby, index) => (
        <motion.li
          key={`hobby-${index}`}
          style={styles.item(hovered === index)}
          variants={itemVariants}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={styles.tag}>{hobby.title}</span>
          <span style={styles.desc}>{hobby.desc}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}