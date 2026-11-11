import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { EASE } from '../lib/motion';
import { HACKATHONS, PROJECTS } from '../data/portfolio';
import './Projects.css';
import './ProjectsGrid.css';

const SWIPE_THRESHOLD = 70;
const AUTOPLAY_DELAY = 6000;
const MAX_TAGS_SHOWCASE = 6;
const MAX_TAGS_GRID = 4;

/* Filter groups, keyed off each project's existing `type`. A project can
   sit in more than one (see inCategory), so the counts overlap. */
const CATEGORY_OF_TYPE = {
  'Live site': 'live',
  'Client work': 'live',
  'Team project': 'live',
  'Hackathon build': 'hackathon',
  'Innovation Week build': 'hackathon',
  'Open source': 'oss',
  'Automation system': 'tools',
  'Infrastructure tool': 'tools',
};

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'fa-solid fa-border-all' },
  { id: 'live', label: 'Client & live', icon: 'fa-solid fa-globe' },
  { id: 'hackathon', label: 'Hackathons', icon: 'fa-solid fa-trophy' },
  { id: 'oss', label: 'Open source', icon: 'fa-brands fa-github' },
  { id: 'tools', label: 'Tools & automation', icon: 'fa-solid fa-gears' },
];

/* Every project entered in a hackathon, whatever its `type` — SmartAuction
   is a live site *and* a hackathon runner-up, so it belongs to both. */
const HACKATHON_PROJECTS = new Set(HACKATHONS.map((h) => h.project.toLowerCase()));

const inCategory = (project, id) =>
  id === 'all' ||
  CATEGORY_OF_TYPE[project.type] === id ||
  (id === 'hackathon' && HACKATHON_PROJECTS.has(project.title.toLowerCase()));

const CATEGORY_COUNTS = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, PROJECTS.filter((p) => inCategory(p, c.id)).length]),
);

/* Hackathon placement for a project, taken from the Experience data so the
   badge and the hackathon cards can never disagree. */
const AWARDS = Object.fromEntries(
  HACKATHONS.filter((h) => h.result).map((h) => [h.project.toLowerCase(), h.result]),
);
const awardFor = (project) => AWARDS[project.title.toLowerCase()];

/* Address shown in the mock browser bar above each screenshot. */
const displayHost = (href) => {
  if (!href) return 'case study in progress';
  try {
    const url = new URL(href);
    return (url.hostname + url.pathname).replace(/^www\./, '').replace(/\/$/, '');
  } catch {
    return href;
  }
};

/* Screenshot in a browser-window frame. `ghost` skips the image (sizer). */
function ProjectFrame({ project, ghost = false }) {
  return (
    <div className="projects__window">
      <div className="projects__chrome" aria-hidden="true">
        <span className="projects__chrome-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="projects__chrome-url">
          <i className={project.href ? 'fa-solid fa-lock' : 'fa-regular fa-clock'} />
          {displayHost(project.href)}
        </span>
      </div>
      <div className="projects__shot">
        {!ghost && (
          <img
            src={project.img}
            width={project.imgWidth}
            height={project.imgHeight}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ objectPosition: project.imgPosition ?? 'center top' }}
          />
        )}
      </div>
    </div>
  );
}

function StackTags({ stack, max }) {
  const shown = stack.slice(0, max);
  const hidden = stack.slice(max);
  return (
    <ul className="projects__stack">
      {shown.map((tech) => (
        <li key={tech} className="tag">
          {tech}
        </li>
      ))}
      {hidden.length > 0 && (
        <li className="tag tag--more" title={hidden.join(', ')}>
          +{hidden.length} more
          <span className="sr-only">: {hidden.join(', ')}</span>
        </li>
      )}
    </ul>
  );
}

function Award({ project }) {
  const award = awardFor(project);
  if (!award) return null;
  return (
    <span className="projects__award">
      <i className="fa-solid fa-award" aria-hidden="true" /> {award}
    </span>
  );
}

function ProjectLink({ project, ghost = false, compact = false }) {
  if (project.href && !ghost) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={compact ? 'btn btn--accent btn--sm' : 'btn btn--accent projects__link'}
        aria-label={`${project.label} (opens in a new tab)`}
      >
        View project
        <i className={project.icon} aria-hidden="true" />
      </a>
    );
  }
  return (
    <span
      className={`btn ${project.href ? 'btn--accent' : 'btn--ghost'} ${compact ? 'btn--sm' : 'projects__link'}`}
    >
      {project.href ? 'View project' : 'Case study in progress'}
      <i className={project.icon} aria-hidden="true" />
    </span>
  );
}

/* One showcase slide. `ghost` renders an inert, image-free copy used only
   to reserve height (see .projects__sizer). */
function SlideContent({ project, index, count, ghost = false }) {
  return (
    <>
      <div className="projects__media">
        <ProjectFrame project={project} ghost={ghost} />
      </div>

      <div className="projects__body">
        <div className="projects__meta">
          <span className="projects__counter">
            {String(index + 1).padStart(2, '0')}
            <span aria-hidden="true"> / </span>
            {String(count).padStart(2, '0')}
          </span>
          <span className="projects__type">{project.type}</span>
          <Award project={project} />
        </div>

        <h3 className="projects__title">{project.title}</h3>
        <p className="projects__desc">{project.desc}</p>
        <StackTags stack={project.stack} max={MAX_TAGS_SHOWCASE} />
        <ProjectLink project={project} ghost={ghost} />
      </div>
    </>
  );
}

function GridCard({ project, onDetails, index }) {
  return (
    <motion.li
      className="project-card"
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.32, delay: Math.min(index, 8) * 0.04, ease: EASE }}
    >
      <div className="project-card__media">
        <ProjectFrame project={project} />
      </div>
      <div className="project-card__body">
        <div className="projects__meta">
          <span className="projects__type">{project.type}</span>
          <Award project={project} />
        </div>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.desc}</p>
        <StackTags stack={project.stack} max={MAX_TAGS_GRID} />
        <div className="project-card__actions">
          <ProjectLink project={project} compact />
          <button type="button" className="btn btn--ghost btn--sm" onClick={onDetails}>
            Details
            <i className="fa-solid fa-up-right-and-down-left-from-center" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.li>
  );
}

export default function Projects() {
  const [view, setView] = useState('showcase');
  const [category, setCategory] = useState('all');
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const timerRef = useRef(null);
  const stageRef = useRef(null);
  const sectionRef = useRef(null);

  const list = useMemo(() => PROJECTS.filter((p) => inCategory(p, category)), [category]);

  const count = list.length;
  const project = list[Math.min(index, count - 1)];
  const liveCount = PROJECTS.filter((p) => p.href).length;

  const chooseCategory = (id) => {
    setCategory(id);
    setIndex(0);
    setDirection(1);
  };

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

  /* From a grid card: open that project in the showcase and bring it into view. */
  const showDetails = (i) => {
    setDirection(1);
    setIndex(i);
    setView('showcase');
    requestAnimationFrame(() =>
      sectionRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }),
    );
  };

  /* Autoplay restarts on every change so the timer never fires immediately
     after a manual navigation. Off in grid view, for a single project,
     for reduced motion, and while the tab is in the background. */
  useEffect(() => {
    if (view !== 'showcase' || isPaused || reduceMotion || count < 2) return undefined;

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
  }, [view, index, isPaused, reduceMotion, count]);

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

  const activeIndex = Math.min(index, count - 1);

  return (
    <motion.section
      id="portfolio"
      ref={sectionRef}
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
            {PROJECTS.length} builds, from hackathon prototypes to automation systems and client work
            that is still running. {liveCount} are live or open source; the rest have case studies on
            the way.
          </p>
        </div>

        <div className="projects__toolbar">
          <div className="skills__filters" role="group" aria-label="Filter projects">
            {CATEGORIES.map((c) => {
              const isActive = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`skills__filter${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => chooseCategory(c.id)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projects-filter"
                      className="skills__filter-bg"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                  <i className={c.icon} aria-hidden="true" />
                  <span>{c.label}</span>
                  <span className="skills__filter-count">{CATEGORY_COUNTS[c.id]}</span>
                </button>
              );
            })}
          </div>

          <div className="projects__views" role="group" aria-label="Layout">
            {[
              { id: 'showcase', label: 'Showcase', icon: 'fa-solid fa-panorama' },
              { id: 'grid', label: 'Grid', icon: 'fa-solid fa-table-cells-large' },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                className={`projects__view${view === v.id ? ' is-active' : ''}`}
                aria-pressed={view === v.id}
                onClick={() => setView(v.id)}
              >
                {view === v.id && (
                  <motion.span
                    layoutId="projects-view"
                    className="projects__view-bg"
                    transition={{ duration: 0.28, ease: EASE }}
                  />
                )}
                <i className={v.icon} aria-hidden="true" />
                <span>{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        {view === 'grid' ? (
          <motion.ul className="projects__grid" layout>
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((item, i) => (
                <GridCard key={item.id} project={item} index={i} onDetails={() => showDetails(i)} />
              ))}
            </AnimatePresence>
          </motion.ul>
        ) : (
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
              {/* Every slide in the current filter, invisible and stacked in one
                  grid cell, so the stage is as tall as the tallest one and
                  nothing below it jumps as the carousel turns. */}
              <div className="projects__sizer" aria-hidden="true" inert>
                {list.map((item, i) => (
                  <div key={item.id} className="projects__slide">
                    <SlideContent project={item} index={i} count={count} ghost />
                  </div>
                ))}
              </div>

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
                  drag={count > 1 ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.12}
                  onDragStart={() => setIsPaused(true)}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
                    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
                    setIsPaused(false);
                  }}
                >
                  <SlideContent project={project} index={activeIndex} count={count} />
                </motion.article>
              </AnimatePresence>
            </div>

            {count > 1 && (
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

                {/* Small screens: a counter with one progress bar instead of ticks */}
                <div className="projects__pager" aria-hidden="true">
                  <span className="projects__pager-count">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                  </span>
                  <span className="projects__tick-bar">
                    {!isPaused && !reduceMotion ? (
                      <motion.span
                        key={`pager-${category}-${activeIndex}`}
                        className="projects__tick-progress"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTOPLAY_DELAY / 1000, ease: 'linear' }}
                      />
                    ) : (
                      <span
                        className="projects__tick-progress"
                        style={{ transform: `scaleX(${(activeIndex + 1) / count})` }}
                      />
                    )}
                  </span>
                </div>

                <div className="projects__ticks" role="tablist" aria-label="Choose a project">
                  {list.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={i === activeIndex}
                      aria-label={`Show ${item.title}`}
                      className={`projects__tick${i === activeIndex ? ' is-active' : ''}`}
                      onClick={() => jumpTo(i)}
                    >
                      <span className="projects__tick-bar">
                        {i === activeIndex && !isPaused && !reduceMotion && (
                          <motion.span
                            key={`${category}-${activeIndex}-${isPaused}`}
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
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}
