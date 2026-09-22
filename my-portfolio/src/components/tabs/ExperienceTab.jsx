import { motion } from 'framer-motion';

const experiences = [
  {
    period: "May 2026 – August 2026",
    title: "Hackathon Runner-Up at Davis & Shirtliff",
    desc: "Built SmartAuction B2B (React, TypeScript, TanStack Query, Zustand, Socket.IO)."
  },
  {
    period: "September 2026",
    title: "Finalist at the 5th Annual Kilimani Urban Hackathon",
    desc: "Developed KiliPlanner: live reporting map using React, Leaflet, and Supabase."
  },
  {
    period: "March 2026 – Present",
    title: "Web Developer at SkillyMe Africa",
    desc: ""
  },
  {
    period: "Jan 2026 – March 2026",
    title: "AI Technical Writing Intern at GAO TEK",
    desc: ""
  },
  {
    period: "Nov 2025 – Dec 2025",
    title: "Freelance: Designing Property Hub Website",
    desc: ""
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ExperienceTab() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {experiences.map((exp, index) => (
        <motion.li key={index} variants={itemVariants}>
          <span>{exp.period}</span>
          {exp.title.includes("Davis & Shirtliff") ? (
            <>
              Hackathon Runner-Up at <strong>Davis &amp; Shirtliff</strong> <br />
              <em>{exp.desc}</em>
            </>
          ) : exp.title.includes("Kilimani") ? (
            <>
              Finalist at the <strong>5th Annual Kilimani Urban Hackathon</strong> <br />
              <em>{exp.desc}</em>
            </>
          ) : (
            <>
              {exp.title.split(" at ")[0]} at <strong>{exp.title.split(" at ")[1]}</strong>
            </>
          )}
        </motion.li>
      ))}
    </motion.ul>
  );
}