import { motion } from 'framer-motion';

// Extracting data to keep the JSX clean and easily mappable
const servicesData = [
  {
    id: 1,
    icon: "fa-solid fa-code",
    title: "Web Development",
    desc: "Building highly responsive, fast, and secure websites from scratch using modern frameworks and clean code."
  },
  {
    id: 2,
    icon: "fa-solid fa-crop-simple",
    title: "UI/UX Design",
    desc: "Designing intuitive, beautiful user interfaces that provide seamless and engaging digital experiences."
  },
  {
    id: 3,
    icon: "fa-brands fa-app-store",
    title: "App Design",
    desc: "Creating functional and aesthetically pleasing mobile application layouts for iOS and Android platforms."
  },
  {
    id: 4,
    icon: "fa-solid fa-robot",
    title: "AI Data Support",
    desc: "Preparing and labeling datasets for model training workflows using tools like Roboflow, Labelbox, and Label Prism."
  },
  {
    id: 5,
    icon: "fa-solid fa-shop",
    title: "E-commerce Support",
    desc: "Setting up and improving online storefront workflows with Shopify and related web commerce tools."
  },
  {
    id: 6,
    icon: "fa-solid fa-shield-halved",
    title: "Cybersecurity Basics",
    desc: "Applying networking fundamentals, security awareness, and beginner pentesting concepts to safer web systems."
  }
];

// Staggered container setup
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15 // Time between each card sliding in
    }
  }
};

// Individual card magic sliding animation
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", // Adds a slight bounce for that "magic" feel
      stiffness: 100,
      damping: 12
    } 
  }
};

export default function Services() {
  return (
    <section id="services">
      <div className="container">
        <motion.h2 
          className="sub-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          My Services
        </motion.h2>
        
        <motion.div 
          className="services-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }} // Triggers when 10% of the grid is visible
        >
          {servicesData.map((service) => (
            <motion.div 
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, // Floats up on hover
                boxShadow: "0px 15px 30px rgba(73, 220, 177, 0.2)", // Subtle glow matching your theme
                transition: { duration: 0.3 }
              }}
            >
              <i className={service.icon} aria-hidden="true"></i>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}