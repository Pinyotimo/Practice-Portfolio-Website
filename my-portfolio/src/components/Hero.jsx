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

/* One pill per tool in HERO.stack. Every 5th is accent-filled, every 7th
   dark, so the pile reads as texture rather than a wall of identical chips. */
const PILL_VARIANTS = (i) => {
  if (i % 5 === 0) return 'shape-hero__pill shape-hero__pill--accent';
  if (i % 7 === 3) return 'shape-hero__pill shape-hero__pill--dark';
  return 'shape-hero__pill';
};

const HERO_SHAPES = [
  ...HERO.stack.map((tech, i) => ({
    id: `tech-${tech}`,
    content: tech,
    className: PILL_VARIANTS(i),
  })),
  { id: 'dot-blue', className: 'shape-hero__dot shape-hero__dot--blue' },
  { id: 'dot-rust', className: 'shape-hero__dot shape-hero__dot--rust' },
  { id: 'dot-green', className: 'shape-hero__dot shape-hero__dot--green' },
];

/* Share of the hero the pile may cover. The whole stack is ~60 pills, so
   phones (less area, smaller pills via CSS) need a higher cap to fit them. */
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
            <motion.span
              className="hero__wave"
              aria-hidden="true"
              animate={{ rotate: [0, 16, -8, 14, -4, 10, 0] }}
              transition={{ duration: 1.6, delay: 1.1, ease: 'easeInOut' }}
            >
              👋
            </motion.span>
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
