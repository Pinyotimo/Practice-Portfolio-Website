import { useState } from 'react';
import { motion } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

const projects = [
  {
    id: 1,
    img: "/Images/auction-management.jpg",
    title: "SmartAuction B2B",
    desc: "B2B auction platform built with React, TypeScript, TanStack Query, Zustand, and Socket.IO for Davis & Shirtliff. Runners-up at the hackathon.",
    href: "https://auction.dayliff.com/",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View SmartAuction live",
  },
  {
    id: 2,
    img: "/Images/kiliplanner-photo.jpeg",
    title: "KiliPlanner",
    desc: "Live, anonymous map for reporting infrastructure and environmental issues in Kilimani Ward, Nairobi. Built with React, Leaflet, and Supabase.",
    href: "https://kiliplanner1.vercel.app/",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View KiliPlanner live",
  },
  {
    id: 3,
    img: "/Images/eldec-photo.jpeg",
    title: "ELDEC Limited Components",
    desc: "React page components built for ELDEC Limited, an electrical and ELV consultancy site showcasing professional engineering solutions.",
    href: "https://eldecengineering.com/",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View ELDEC Limited live",
  },
  {
    id: 4,
    img: "/Images/pharmacy-management-system.png",
    title: "Pharmacy Management System",
    desc: "Collaborated with my team to build a fully functional pharmacy management platform with shopping cart and responsive design.",
    href: "https://pharmaos-app.netlify.app",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View Pharmacy Management System live",
  },
  {
    id: 5,
    img: "/Images/pexels-tranmautritam-251225.jpg",
    title: "Portfolio Website",
    desc: "A personal portfolio built from scratch using HTML, CSS, and modern UI design principles.",
    href: "https://github.com/Pinyotimo/Practice-Portfolio-Website",
    icon: "fa-brands fa-github",
    label: "View Portfolio Website on GitHub",
  },
  {
    id: 6,
    img: "/Images/pexels-tima-miroshnichenko-5380642.jpg",
    title: "Modern HR Management System",
    desc: "A comprehensive HR solution with employee records, attendance tracking, and performance evaluation features.",
    href: "https://oduor.wuaze.com/index.php",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View HR Management System live",
  },
];

export default function Projects() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const styles = {
    section: { padding: isMobile ? '44px 0 18px' : '100px 0 40px' },
    container: { width: 'min(1120px, 90%)', margin: '0 auto' },
    subTitle: {
      margin: '0 0 24px',
      color: 'var(--ink)',
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: 'clamp(1.8rem, 2.6vw + .8rem, 2.8rem)',
      lineHeight: 1.1,
    },
    list: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px,1fr))',
      gap: isMobile ? 16 : 24,
      marginTop: isMobile ? 24 : 46,
    },
    work: {
      position: 'relative',
      overflow: 'hidden',
      minHeight: isMobile ? 0 : 360,
      aspectRatio: isMobile ? 'auto' : '4 / 5',
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      background: 'var(--bg-panel)',
    },
    img: {
      width: '100%',
      height: isMobile ? 240 : '100%',
      objectFit: 'cover',
      display: 'block',
    },
    layer: (open) => ({
      position: isMobile ? 'static' : 'absolute',
      inset: isMobile ? undefined : 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      gap: 14,
      padding: isMobile ? 22 : 26,
      background: isMobile ? 'var(--ink)' : 'linear-gradient(180deg, rgba(21,24,28,0), rgba(21,24,28,.94) 55%)',
      transform: isMobile ? 'none' : (open ? 'translateY(0)' : 'translateY(20%)'),
      transition: 'transform .3s ease',
    }),
    title: { fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? '1.18rem' : '1.35rem', fontWeight: 700, color: '#fff', margin: 0 },
    desc: { color: 'rgba(255,255,255,.82)', lineHeight: 1.7, fontSize: isMobile ? '.9rem' : '.94rem', margin: 0 },
    link: (hovered) => ({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: isMobile ? 42 : 46,
      height: isMobile ? 42 : 46,
      flex: `0 0 ${isMobile ? 42 : 46}px`,
      marginTop: 8,
      borderRadius: 3,
      background: hovered ? 'var(--accent)' : '#fff',
      color: hovered ? '#fff' : 'var(--ink)',
      textDecoration: 'none',
      fontSize: '1.1rem',
      transition: 'background-color .15s ease, color .15s ease',
    }),
  };

  return (
    <motion.section
      id="portfolio"
      style={styles.section}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div style={styles.container}>
        <h2 style={styles.subTitle}>My Projects</h2>
        <div style={styles.list}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} styles={styles} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function ProjectCard({ project, index, styles, isMobile }) {
  const [hoverCard, setHoverCard] = useState(false);

  return (
    <motion.div
      style={styles.work}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseEnter={() => setHoverCard(true)}
      onMouseLeave={() => setHoverCard(false)}
    >
      <img src={project.img} alt={project.title} style={styles.img} />
      <div style={styles.layer(hoverCard || isMobile)}>
        <h3 style={styles.title}>{project.title}</h3>
        <p style={styles.desc}>{project.desc}</p>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={project.label}
          style={styles.link(hoverCard)}
        >
          <i className={project.icon} aria-hidden="true"></i>
        </a>
      </div>
    </motion.div>
  );
}