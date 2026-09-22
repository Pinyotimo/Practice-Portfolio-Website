import { motion } from 'framer-motion';

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

export default function SkillsTab() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {skills.map((skill, index) => (
        <motion.li key={index} variants={itemVariants}>
          <span>{skill.title}</span>
          {skill.desc}
        </motion.li>
      ))}
    </motion.ul>
  );
}