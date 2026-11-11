import { useId, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EASE } from '../../lib/motion';
import { TECH_CATEGORIES } from '../../data/portfolio';
import { projectsUsing, splitTag } from '../../lib/evidence';
import './Tabs.css';

/* Two-character badge for tools without a logo: "C++" stays "C++",
   "Pydantic" → "Py", "FastAPI" → "Fa". */
const monogram = (tag) => {
  const first = splitTag(tag)[0] ?? tag;
  if (first.length <= 3) return first;
  return first[0].toUpperCase() + first[1].toLowerCase();
};

/* Monogram tint rotates through the three chart roles by group. */
const TINTS = ['tint-1', 'tint-2', 'tint-3'];

const CATEGORIES = TECH_CATEGORIES.map((category, groupIndex) => ({
  ...category,
  tint: TINTS[groupIndex % TINTS.length],
  items: category.items.map((item) => ({
    ...item,
    projects: item.count === false ? [] : projectsUsing(item.match ?? splitTag(item.tag)),
  })),
}));

const TOTAL = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);

const FILTERS = [
  { id: 'all', label: 'All', icon: 'fa-solid fa-border-all', count: TOTAL },
  ...CATEGORIES.map((c) => ({ id: c.heading, label: c.heading, icon: c.icon, count: c.items.length })),
];

function TechTile({ item, tint, index }) {
  const count = item.projects.length;
  return (
    <motion.li
      className="tech-tile"
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.28, delay: Math.min(index, 10) * 0.03, ease: EASE }}
    >
      <span className={`tech-tile__logo${item.icon ? '' : ` tech-tile__logo--mono ${tint}`}`} aria-hidden="true">
        {item.icon ? <i className={item.icon} /> : monogram(item.tag)}
      </span>
      <span className="tech-tile__text">
        <span className="tech-tile__name">{item.tag}</span>
        <span className="tech-tile__desc">{item.desc}</span>
      </span>
      {count > 0 && (
        <span
          className="tech-tile__count"
          title={`Used in: ${item.projects.map((p) => p.title).join(', ')}`}
        >
          <i className="fa-solid fa-folder-open" aria-hidden="true" />
          {count}
          <span className="sr-only"> project{count > 1 ? 's' : ''}</span>
        </span>
      )}
    </motion.li>
  );
}

export default function CoreTechTab() {
  const [group, setGroup] = useState('all');
  const [query, setQuery] = useState('');
  const searchId = useId();

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.filter((c) => group === 'all' || c.heading === group)
      .map((c) => ({
        ...c,
        items: q
          ? c.items.filter((i) => `${i.tag} ${i.desc}`.toLowerCase().includes(q))
          : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [group, query]);

  const shown = visible.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="core-tech">
      <div className="core-tech__toolbar">
        <label className="core-tech__search" htmlFor={searchId}>
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          <span className="sr-only">Search technologies</span>
          <input
            id={searchId}
            type="search"
            placeholder="Search technologies…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </label>
        <p className="core-tech__summary" aria-live="polite">
          <strong>{shown}</strong> of {TOTAL} technologies
        </p>
      </div>

      <div className="skills__filters" role="group" aria-label="Filter by category">
        {FILTERS.map((f) => {
          const isActive = group === f.id;
          return (
            <button
              key={f.id}
              type="button"
              className={`skills__filter${isActive ? ' is-active' : ''}`}
              aria-pressed={isActive}
              onClick={() => setGroup(f.id)}
            >
              {isActive && (
                <motion.span
                  layoutId="core-tech-filter"
                  className="skills__filter-bg"
                  transition={{ duration: 0.3, ease: EASE }}
                />
              )}
              <i className={f.icon} aria-hidden="true" />
              <span>{f.label}</span>
              <span className="skills__filter-count">{f.count}</span>
            </button>
          );
        })}
      </div>

      <div className="core-tech__groups">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((category) => (
            <motion.section
              key={category.heading}
              className="core-tech__group"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <h3 className="core-tech__heading">
                <span className={`core-tech__heading-icon ${category.tint}`} aria-hidden="true">
                  <i className={category.icon} />
                </span>
                {category.heading}
                <span className="core-tech__heading-count">{category.items.length}</span>
              </h3>
              <ul className="core-tech__grid">
                <AnimatePresence mode="popLayout" initial={false}>
                  {category.items.map((item, index) => (
                    <TechTile key={item.tag} item={item} tint={category.tint} index={index} />
                  ))}
                </AnimatePresence>
              </ul>
            </motion.section>
          ))}
        </AnimatePresence>

        {shown === 0 && (
          <p className="core-tech__empty">
            Nothing matches “{query}”.{' '}
            <button type="button" onClick={() => setQuery('')}>
              Clear search
            </button>
          </p>
        )}
      </div>

      <p className="core-tech__legend">
        <i className="fa-solid fa-folder-open" aria-hidden="true" /> = number of projects in the
        Projects section that list it — hover to see which.
      </p>
    </div>
  );
}
