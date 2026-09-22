import { motion } from 'framer-motion';

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function EducationTab() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Education Section */}
      {educationItems.map((item, index) => (
        <motion.li key={`edu-${index}`} variants={itemVariants}>
          <span>{item.label}</span>
          {item.title}
          <strong>{item.bold}</strong>
          {item.link && (
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="certificate-btn">
              <i className="fa-solid fa-certificate" aria-hidden="true"></i> View Certificate
            </a>
          )}
        </motion.li>
      ))}

      {/* Certifications Section */}
      <motion.li variants={itemVariants} className="tech-heading">
        Additional Certifications
      </motion.li>
      
      {certItems.map((item, index) => (
        <motion.li key={`cert-${index}`} variants={itemVariants}>
          <span>{item.label}</span>
          {item.text}
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="certificate-btn">
            <i className="fa-solid fa-certificate" aria-hidden="true"></i> View Certificate
          </a>
        </motion.li>
      ))}
    </motion.ul>
  );
}