import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '../hooks/useMediaQuery';

const projects = [
  {
    id: 1,
    img: "/Images/auction-management.jpg",
    title: "SmartAuction B2B",
    desc: "B2B auction platform built for Davis & Shirtliff. Runners-up at the hackathon.",
    stack: ["React", "TypeScript", "TanStack Query", "Zustand", "Socket.IO"],
    href: "https://auction.dayliff.com/",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View SmartAuction live",
  },
  {
    id: 2,
    img: "/Images/kiliplanner-photo.jpeg",
    title: "KiliPlanner",
    desc: "Live, anonymous map for reporting infrastructure and environmental issues in Kilimani Ward, Nairobi.",
    stack: ["React", "Leaflet", "Supabase"],
    href: "https://kiliplanner1.vercel.app/",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View KiliPlanner live",
  },
  {
    id: 3,
    img: "/Images/eldec-photo.jpeg",
    title: "ELDEC Limited Components",
    desc: "React page components for ELDEC Limited, an electrical and ELV consultancy site.",
    stack: ["React"],
    href: "https://eldecengineering.com/",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View ELDEC Limited live",
  },
  {
    id: 4,
    img: "/Images/pharmacy-management-system.png",
    title: "Pharmacy Management System",
    desc: "Team-built pharmacy management platform with shopping cart and responsive design.",
    stack: ["React", "Node.js"],
    href: "https://pharmaos-app.netlify.app",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View Pharmacy Management System live",
  },
  {
    id: 5,
    img: "/Images/pexels-tranmautritam-251225.jpg",
    title: "Portfolio Website",
    desc: "A personal portfolio built from scratch using HTML, CSS, and modern UI design principles.",
    stack: ["HTML", "CSS"],
    href: "https://github.com/Pinyotimo/Practice-Portfolio-Website",
    icon: "fa-brands fa-github",
    label: "View Portfolio Website on GitHub",
  },
  {
    id: 6,
    img: "/Images/pexels-tima-miroshnichenko-5380642.jpg",
    title: "Modern HR Management System",
    desc: "A comprehensive HR solution with employee records, attendance tracking, and performance evaluation.",
    stack: ["PHP", "MySQL"],
    href: "https://oduor.wuaze.com/index.php",
    icon: "fa-solid fa-arrow-up-right-from-square",
    label: "View HR Management System live",
  },
];

const SWIPE_THRESHOLD = 80;

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 900px)');

  const go = (dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + projects.length) % projects.length);
  };

  const jumpTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const project = projects[index];

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
    stage: {
      position: 'relative',
      marginTop: isMobile ? 24 : 40,
      border: '1px solid var(--hairline)',
      borderRadius: 6,
      background: 'var(--bg-panel)',
      overflow: 'hidden',
    },
    inner: {
      display: 'grid',
      gridTemplateColumns: isTablet ? '1fr' : 'minmax(0, 1.15fr) minmax(0, 0.85fr)',
    },
    imgWrap: {
      position: 'relative',
      overflow: 'hidden',
      aspectRatio: isTablet ? '16 / 10' : 'auto',
      minHeight: isTablet ? 'auto' : 440,
      background: 'var(--bg-panel-alt)',
    },
    img: { width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' },
    counter: {
      position: 'absolute',
      top: 16,
      left: 16,
      padding: '4px 10px',
      background: 'rgba(241,240,236,.92)',
      border: '1px solid var(--hairline)',
      borderRadius: 3,
      color: 'var(--ink)',
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '.78rem',
      fontWeight: 500,
    },
    content: {
      padding: isMobile ? 24 : 40,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 16,
    },
    title: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: isMobile ? '1.5rem' : '1.9rem',
      color: 'var(--ink)',
      margin: 0,
    },
    desc: { color: 'var(--ink-soft)', lineHeight: 1.75, fontSize: '1rem', margin: 0 },
    stack: { display: 'flex', flexWrap: 'wrap', gap: 8 },
    tag: {
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: '.78rem',
      padding: '5px 11px',
      borderRadius: 3,
      background: 'var(--accent-soft)',
      border: '1px solid var(--hairline)',
      color: 'var(--accent)',
    },
    link: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 8,
      width: 'fit-content',
      padding: '11px 20px',
      border: '1px solid var(--ink)',
      borderRadius: 3,
      background: 'var(--ink)',
      color: 'var(--bg-main)',
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '.94rem',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 16,
    },
    arrows: { display: 'flex', gap: 8 },
    arrowBtn: {
      width: 42,
      height: 42,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--hairline-strong)',
      borderRadius: 3,
      background: 'var(--bg-panel)',
      color: 'var(--ink)',
      cursor: 'pointer',
    },
    ticks: { display: 'flex', gap: 6, flex: 1, justifyContent: 'center' },
    tick: (active) => ({
      width: active ? 24 : 14,
      height: 3,
      background: active ? 'var(--accent)' : 'var(--hairline-strong)',
      border: 0,
      cursor: 'pointer',
      padding: 0,
      transition: 'width .2s ease, background-color .2s ease',
    }),
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
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

        <div style={styles.stage}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={project.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={styles.inner}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) go(1);
                else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
              }}
            >
              <div style={styles.imgWrap}>
                <img src={project.img} alt={project.title} style={styles.img} />
                <span style={styles.counter}>
                  {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              <div style={styles.content}>
                <h3 style={styles.title}>{project.title}</h3>
                <p style={styles.desc}>{project.desc}</p>
                <div style={styles.stack}>
                  {project.stack.map((tech) => (
                    <span key={tech} style={styles.tag}>{tech}</span>
                  ))}
                </div>
                
                {/* Fixed line below: Added the opening <a ...> tag */}
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={project.label}
                  style={styles.link}
                >
                  View project <i className={project.icon} aria-hidden="true"></i>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={styles.controls}>
          <div style={styles.arrows}>
            <button style={styles.arrowBtn} onClick={() => go(-1)} aria-label="Previous project" type="button">
              <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
            </button>
            <button style={styles.arrowBtn} onClick={() => go(1)} aria-label="Next project" type="button">
              <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </button>
          </div>

          <div style={styles.ticks}>
            {projects.map((p, i) => (
              <button
                key={p.id}
                style={styles.tick(i === index)}
                onClick={() => jumpTo(i)}
                aria-label={`Go to ${p.title}`}
                type="button"
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}