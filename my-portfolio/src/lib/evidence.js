import { PROJECTS } from '../data/portfolio';

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* Whole-word, case-insensitive: "Java" must not match "JavaScript", "Git"
   must not match "GitHub". Hyphens and slashes count as word breaks. */
const mentions = (tech, name) =>
  new RegExp(`(^|[^a-z0-9])${escape(name)}($|[^a-z0-9])`, 'i').test(tech);

/* Projects whose stack names any of `names`. */
export function projectsUsing(names) {
  const wanted = names.filter((name) => name.trim().length > 1);
  if (!wanted.length) return [];
  return PROJECTS.filter((project) =>
    project.stack.some((tech) => wanted.some((name) => mentions(tech, name))),
  );
}

/* "Tailwind CSS & Base UI" → ["Tailwind CSS", "Base UI"] */
export const splitTag = (tag) =>
  tag
    .split(/\s*(?:&|,|\/)\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
