import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { PROJECTS } from '../data/portfolio';
import './Projects.css';

const SWIPE_THRESHOLD = 70;
const AUTOPLAY_DELAY = 6000;

export default function Projects() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef(null);
  const stageRef = useRef(null);

  const count = PROJECTS.length;
  const project = PROJECTS[index];

  const go = useCallback(
    (dir) => {
      setDirection(dir);
      setIndex((i) => (i + dir + count) % count);
    },
    [count],
  );

  const jumpTo = useCallback(
    (i) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index],
  );

  /* Autoplay restarts on every change so the timer never fires immediately
     after a manual navigation. Disabled when the visitor asks for reduced
     motion, or while the tab is in the background. */
  useEffect(() => {
    if (isPaused || reduceMotion) return undefined;

    const start = () => {
      timerRef.current = window.setTimeout(() => {
        setDirection(1);
        setIndex((i) => (i + 1) % count);
      }, AUTOPLAY_DELAY);
    };

    const onVisibility = () => {
      window.clearTimeout(timerRef.current);
      if (!document.hidden) start();
    };

    start();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearTimeout(timerRef.current);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [index, isPaused, reduceMotion, count]);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -48 : 48 }),
  };

  return (
    <motion.section
      id="portfolio"
      className="section section--soft"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">Selected work</span>
            <h2 className="section-head__title">My projects</h2>
          </div>
          <p className="section-head__lede">
            Six builds, from hackathon prototypes to client work that is still
            running. Every one of them is live and clickable.
          </p>
        </div>

        <div
          className="projects"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
          }}
        >
          <div
            className="projects__stage"
            ref={stageRef}
            role="group"
            aria-roledescription="carousel"
            aria-label="Featured projects"
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={project.id}
                className="projects__slide"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -SWIPE_THRESHOLD) go(1);
                  else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
                  setIsPaused(false);
                }}
              >
                <div className="projects__media">
                  <img
                    src={project.img}
                    width={project.imgWidth}
                    height={project.imgHeight}
                    alt={`Screenshot of ${project.title}`}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="projects__type">{project.type}</span>
                </div>

                <div className="projects__body">
                  <span className="projects__counter">
                    {String(index + 1).padStart(2, '0')}
                    <span aria-hidden="true"> / </span>
                    {String(count).padStart(2, '0')}
                  </span>

                  <h3 className="projects__title">{project.title}</h3>
                  <p className="projects__desc">{project.desc}</p>

                  <ul className="projects__stack">
                    {project.stack.map((tech) => (
                      <li key={tech} className="tag">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--accent projects__link"
                    aria-label={`${project.label} (opens in a new tab)`}
                  >
                    View project
                    <i className={project.icon} aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="projects__controls">
            <div className="projects__arrows">
              <button
                type="button"
                className="icon-btn"
                onClick={() => go(-1)}
                aria-label="Previous project"
              >
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => go(1)}
                aria-label="Next project"
              >
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
            </div>

            <div className="projects__ticks" role="tablist" aria-label="Choose a project">
              {PROJECTS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show ${item.title}`}
                  className={`projects__tick${i === index ? ' is-active' : ''}`}
                  onClick={() => jumpTo(i)}
                >
                  <span className="projects__tick-bar">
                    {i === index && !isPaused && !reduceMotion && (
                      <motion.span
                        key={`${index}-${isPaused}`}
                        className="projects__tick-progress"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear' }}
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>

            <span className="projects__hint">
              {isPaused ? (
                <>
                  <i className="fa-solid fa-pause" aria-hidden="true" /> Paused
                </>
              ) : (
                <>
                  <i className="fa-solid fa-play" aria-hidden="true" /> Auto
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
