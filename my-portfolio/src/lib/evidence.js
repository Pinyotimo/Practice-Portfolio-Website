import { PROJECTS } from '../data/portfolio';

/* Projects whose stack lists any of `names`. Names are TECH registry names
   and project stacks use the same spelling (enforced by check:data), so an
   exact match is enough — no fuzzy "Java" vs "JavaScript" guessing. */
export function projectsUsing(names) {
  if (!names?.length) return [];
  const wanted = new Set(names);
  return PROJECTS.filter((project) => project.stack.some((tech) => wanted.has(tech)));
}
