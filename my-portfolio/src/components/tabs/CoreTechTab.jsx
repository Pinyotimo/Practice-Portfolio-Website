import { motion } from "framer-motion";
import useMediaQuery from "../../hooks/useMediaQuery";

const TECH_CATEGORIES = [
  {
    heading: "Programming Languages",
    items: [
      { tag: "C", desc: "Low-level systems logic and custom memory management." },
      { tag: "C++", desc: "High-performance applications and object-oriented structures." },
      { tag: "Java", desc: "Robust cross-platform enterprise software." },
      { tag: "Python", desc: "Automation, rapid prototyping, and backend logic." },
      { tag: "JavaScript / TypeScript", desc: "Type-safe modular logic and dynamic interfaces." },
    ],
  },
  {
    heading: "Frontend, Backend & Frameworks",
    items: [
      { tag: "React", desc: "Building responsive user interfaces." },
      { tag: "Node.js & Express", desc: "Developing server-side APIs and services." },
      { tag: "Django", desc: "Building secure, rapid full-stack architectures." },
      { tag: "APIs", desc: "Designing and consuming RESTful interfaces." },
      { tag: "Zustand & TanStack Query", desc: "State management and server-state caching." },
    ],
  },
  {
    heading: "Databases, Caching & Real-Time",
    items: [
      { tag: "MongoDB / MERN", desc: "NoSQL data storage and full-stack integration." },
      { tag: "PostgreSQL & Supabase", desc: "Relational schemas and real-time backend services." },
      { tag: "Redis", desc: "In-memory data caching and message brokering." },
      { tag: "Socket.IO", desc: "Real-time bidirectional communication." },
    ],
  },
  {
    heading: "DevOps, AI & Tools",
    items: [
      { tag: "Git & GitHub", desc: "Version control, source code management, and collaborative development." },
      { tag: "Docker", desc: "Containerizing applications for consistent deployment." },
      { tag: "Kubernetes", desc: "Orchestrating containerized workloads." },
      { tag: "Ollama", desc: "Running local large language models." },
      { tag: "AI Data Annotation", desc: "Training datasets using Roboflow, Labelbox, and Label Studio." },
    ],
  },
];

export default function CoreTechTab() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const styles = {
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    categoryWrapper: {
      marginBottom: "28px",
    },
    heading: {
      color: "var(--ink)",
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: isMobile ? "1.1rem" : "1.2rem",
      fontWeight: 700,
      margin: "0 0 16px 0",
    },
    item: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: isMobile ? "flex-start" : "baseline",
      gap: isMobile ? 6 : 12,
      marginBottom: "14px",
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
    },
    desc: {
      margin: 0,
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
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
      {TECH_CATEGORIES.map((category, catIndex) => (
        <div key={category.heading} style={styles.categoryWrapper}>
          <motion.li style={styles.heading} variants={itemVariants}>
            {category.heading}
          </motion.li>
          
          {category.items.map((item, itemIndex) => (
            <motion.li key={item.tag} style={styles.item} variants={itemVariants}>
              <span style={styles.tag}>{item.tag}</span>
              <span style={styles.desc}>{item.desc}</span>
            </motion.li>
          ))}
        </div>
      ))}
    </motion.ul>
  );
}