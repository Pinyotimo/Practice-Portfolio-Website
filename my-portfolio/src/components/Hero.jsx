import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { EASE } from '../lib/motion';
import { HERO } from '../data/portfolio';
import ShapeHero from './kokonutui/shape-hero';
import './Hero.css';

const rise = (delay) => ({
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
});

/* Keep the pile focused on core languages and infrastructure tools. */
const PILL_VARIANTS = (i) => {
  if (i % 5 === 0) return 'shape-hero__pill shape-hero__pill--accent';
  if (i % 7 === 3) return 'shape-hero__pill shape-hero__pill--dark';
  return 'shape-hero__pill';
};

/* Roles go first: the pile hides whatever doesn't fit, starting from the end. */
const HERO_ROLES = [
  'Full-stack web development',
  'Automation & AI integration',
  'Payment integration',
];

const ROLE_SHAPES = HERO_ROLES.map((role) => ({
  id: `role-${role}`,
  content: role,
  className: 'shape-hero__pill shape-hero__pill--role',
}));

const TECH_SHAPES = [
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C++',
  'PHP',
  'HTML',
  'CSS',
  'GitHub',
  'Docker',
  'Kubernetes',
  'React',
].map((tech, i) => ({
  id: `tech-${tech}`,
  content: tech,
  className: PILL_VARIANTS(i),
}));

const HERO_SHAPES = [...ROLE_SHAPES, ...TECH_SHAPES];

/* Phones need a little more room because the pills are smaller via CSS. */
const pileFill = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 899px)').matches ? 0.5 : 0.32;

const ROLE_INTERVAL = 2800;

/* "I build …" — cycles through HERO.roles. Screen readers get the full
   list once instead of a live region that re-announces every few seconds. */
function RotatingRole({ roles }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || roles.length < 2) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % roles.length), ROLE_INTERVAL);
    return () => clearInterval(id);
  }, [roles.length, reduceMotion]);

  return (
    <p className="hero__role">
      <span className="sr-only">I build {roles.join(', ')}.</span>
      <span aria-hidden="true">
        <span className="hero__role-prefix">I build</span>{' '}
        <span className="hero__role-window">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={roles[index]}
              className="hero__role-word"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.38, ease: EASE }}
            >
              {roles[index]}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className="hero__role-caret" />
      </span>
    </p>
  );
}

/* Decorative layer: drifting colour orbs over a masked dot grid. All
   colours come from theme tokens, so it re-tints with every theme. */
function HeroBackdrop() {
  return (
    <div className="hero__backdrop" aria-hidden="true">
      <div className="hero__grid-dots" />
      <span className="hero__orb hero__orb--a" />
      <span className="hero__orb hero__orb--b" />
      <span className="hero__orb hero__orb--c" />
    </div>
  );
}

/* Photo that leans toward the pointer. */
function TiltFigure({ children }) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), spring);

  const onMove = (event) => {
    if (reduceMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      className="hero__tilt"
      style={{ rotateX, rotateY }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <motion.section
      id="home"
      className="hero section"
      initial="hidden"
      animate="show"
    >
      <HeroBackdrop />
      <ShapeHero
        className="shape-hero--background"
        title={null}
        description={null}
        actions={null}
        shapes={HERO_SHAPES}
        fill={pileFill()}
      />
      <div className="container hero__grid">
        <motion.div className="hero__figure" variants={rise(0.05)}>
          {/* Slowly turning dashed orbit with a travelling dot */}
          <svg className="hero__orbit" viewBox="0 0 200 200" aria-hidden="true">
            <circle cx="100" cy="100" r="96" />
            <circle className="hero__orbit-dot" cx="100" cy="4" r="3.5" />
          </svg>

          <TiltFigure>
            <div className="hero__photo">
              <img
                src="/Images/profile-photo.jpg"
                width="1024"
                height="1024"
                alt="Portrait of Stephen Oduor"
                fetchPriority="high"
                decoding="async"
              />
              <span className="hero__photo-sheen" aria-hidden="true" />
            </div>
          </TiltFigure>

          <motion.span
            className="hero__chip hero__chip--code"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8, ease: EASE }}
          >
            <i className="fa-solid fa-code" />
          </motion.span>
          <motion.span
            className="hero__chip hero__chip--spark"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.95, ease: EASE }}
          >
            <i className="fa-solid fa-wand-magic-sparkles" />
          </motion.span>

          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
          >
            <i className="fa-solid fa-trophy" aria-hidden="true" />
            <span>
              <strong>Runner-up</strong>
              SmartAuction B2B hackathon
            </span>
          </motion.div>
        </motion.div>

        <div className="hero__body">
          <motion.p className="hero__status" variants={rise(0.1)}>
            <span className="hero__status-dot" aria-hidden="true" />
            {HERO.kicker}
          </motion.p>

          <motion.h1 className="hero__title" variants={rise(0.16)}>
            {HERO.heading} <span className="hero__title-accent">{HERO.highlight}</span>
            <HeroSpark />
          </motion.h1>

          <motion.div className="hero__role-wrap" variants={rise(0.2)}>
            <RotatingRole roles={HERO.roles} />
          </motion.div>

          <motion.p className="hero__lead" variants={rise(0.24)}>
            {HERO.lead}
          </motion.p>

          <motion.ul
            className="hero__tools"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05, delayChildren: 0.32 } },
            }}
          >
            {HERO.tools.map((tool) => (
              <motion.li
                key={tool}
                className="tag tag--plain"
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.9 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE } },
                }}
                whileHover={{ y: -3 }}
              >
                {tool}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div className="hero__actions" variants={rise(0.4)}>
            <a href="#portfolio" className="btn btn--accent hero__cta">
              See my work
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Get in touch
            </a>
            <a
              href="/Images/Stephen-Oduor-CV.pdf"
              download
              className="btn btn--ghost"
            >
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>

    </motion.section>
  );
}

/* Four-point star: long vertical and horizontal points with pinched sides */
const STAR_PATH =
  'M12 0C12.9 7.2 16.8 11.1 24 12C16.8 12.9 12.9 16.8 12 24C11.1 16.8 7.2 12.9 0 12C7.2 11.1 11.1 7.2 12 0Z';

const SPARK_PARTICLES = Array.from({ length: 8 }, (_, index) => {
  const angle = (index / 8) * Math.PI * 2;
  const distance = index % 2 ? 1.05 : 1.4;
  return {
    x: `${Math.cos(angle) * distance}em`,
    y: `${Math.sin(angle) * distance}em`,
    size: index % 2 ? 4 : 6,
  };
});

/**
 * Sparkle beside the name. It spins in, bursts a ring of particles once,
 * then idles with a slow breathing twinkle and a small companion star.
 */
function HeroSpark() {
  const reduceMotion = useReducedMotion();
  const ENTER = 1.1;

  if (reduceMotion) {
    return (
      <span className="hero__spark" aria-hidden="true">
        <svg className="hero__spark-star" viewBox="0 0 24 24">
          <path d={STAR_PATH} />
        </svg>
      </span>
    );
  }

  return (
    <span className="hero__spark" aria-hidden="true">
      {SPARK_PARTICLES.map((particle, index) => (
        <motion.span
          key={index}
          className="hero__spark-particle"
          style={{ width: particle.size, height: particle.size }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
          animate={{
            x: particle.x,
            y: particle.y,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{ duration: 0.9, delay: ENTER + 0.15, ease: [0.22, 0.61, 0.36, 1] }}
        />
      ))}

      <motion.span
        className="hero__spark-ring"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.2], opacity: [0.7, 0] }}
        transition={{ duration: 0.8, delay: ENTER + 0.1, ease: 'easeOut' }}
      />

      <motion.svg
        className="hero__spark-star"
        viewBox="0 0 24 24"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 14, delay: ENTER }}
      >
        <motion.path
          d={STAR_PATH}
          animate={{ scale: [1, 0.82, 1], rotate: [0, 45, 90] }}
          style={{ originX: '50%', originY: '50%' }}
          transition={{
            duration: 3.2,
            delay: ENTER + 0.9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.svg>

      <motion.svg
        className="hero__spark-mini"
        viewBox="0 0 24 24"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1, 0], opacity: [0, 1, 0], rotate: [0, 90] }}
        transition={{
          duration: 1.8,
          delay: ENTER + 0.6,
          repeat: Infinity,
          repeatDelay: 1.4,
          ease: 'easeInOut',
        }}
      >
        <path d={STAR_PATH} />
      </motion.svg>
    </span>
  );
}
