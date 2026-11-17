/* Validates the cross-references in src/data/portfolio.js so the website,
   the CV and the meta tags can't quietly drift apart. Runs before every
   build; `npm run check:data` runs it on its own. */
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = await import(pathToFileURL(path.join(root, 'src/data/portfolio.js')).href);
const {
  CERTIFICATIONS, CV, DISCIPLINES, EDUCATION, EXPERIENCE, HACKATHONS, HERO, PROJECTS,
  ROLES, ROLE_TIERS, SERVICES, SITE, SKILLS, TECH, TECH_CATEGORIES, smallImage,
} = data;

const errors = [];
const fail = (where, message) => errors.push(`${where}: ${message}`);
const isTech = (name) => Object.hasOwn(TECH, name);
const splitTools = (tool) => tool.split(/\s*&\s*/);

/* --- Tech names ------------------------------------------------------ */
const coreTools = new Set(TECH_CATEGORIES.flatMap((c) => c.items.flatMap((i) => i.tools)));

for (const project of PROJECTS) {
  for (const tech of project.stack) {
    if (!isTech(tech)) fail(`PROJECTS "${project.title}"`, `stack item "${tech}" is not in TECH`);
    else if (!TECH[tech].discipline) fail(`PROJECTS "${project.title}"`, `"${tech}" has no discipline, so the stack chart can't place it`);
  }
}
for (const category of TECH_CATEGORIES) {
  for (const item of category.items) {
    for (const tool of item.tools) {
      if (!isTech(tool)) fail(`Core tech "${category.heading}"`, `"${tool}" is not in TECH`);
    }
  }
}
for (const name of Object.keys(TECH)) {
  if (!coreTools.has(name)) fail('TECH', `"${name}" is not listed in any Core tech item`);
  const discipline = TECH[name].discipline;
  if (discipline && !DISCIPLINES[discipline]) fail('TECH', `"${name}" has unknown discipline "${discipline}"`);
}
for (const tool of HERO.tools) {
  if (!isTech(tool)) fail('HERO.tools', `"${tool}" is not in TECH`);
}
for (const skill of SKILLS) {
  for (const name of skill.evidence ?? []) {
    if (!isTech(name)) fail(`SKILLS "${skill.title}"`, `evidence "${name}" is not in TECH`);
  }
}

/* --- Roles: backed by Skills, tools drawn from those Skills ---------- */
const tierIds = new Set(ROLE_TIERS.map((t) => t.id));
const skillsByTitle = new Map(SKILLS.map((s) => [s.title, s]));

for (const role of ROLES) {
  const where = `ROLES "${role.id}"`;
  for (const field of ['title', 'area', 'service', 'icon', 'desc']) {
    if (!role[field]) fail(where, `missing ${field}`);
  }
  if (!tierIds.has(role.tier)) fail(where, `unknown tier "${role.tier}"`);
  if ((role.tier === 'lead' || role.tier === 'also') && !role.builds) {
    fail(where, `${role.tier} roles need \`builds\` for the hero's "I build …" line`);
  }
  if (!role.skills?.length) fail(where, 'needs at least one SKILLS title as evidence');
  const linked = (role.skills ?? []).map((title) => {
    if (!skillsByTitle.has(title)) fail(where, `skill "${title}" is not a SKILLS title`);
    return skillsByTitle.get(title);
  }).filter(Boolean);
  const linkedTools = new Set(linked.flatMap((s) => s.tools.flatMap(splitTools)));
  for (const tool of role.tools.flatMap(splitTools)) {
    if (!linkedTools.has(tool)) fail(where, `tool "${tool}" isn't on any of its Skills cards (${role.skills.join(', ')})`);
  }
}
for (const tier of ROLE_TIERS) {
  if (!ROLES.some((r) => r.tier === tier.id)) fail('ROLE_TIERS', `no role in tier "${tier.id}"`);
}
if (SERVICES.length !== ROLES.length) fail('SERVICES', 'should be derived one-to-one from ROLES');

/* --- Titles and names that point at other records -------------------- */
const projectTitles = new Set(PROJECTS.map((p) => p.title.toLowerCase()));
const certTexts = new Set(CERTIFICATIONS.map((c) => c.text));

for (const hack of HACKATHONS) {
  if (!projectTitles.has(hack.project.toLowerCase())) fail(`HACKATHONS "${hack.event}"`, `project "${hack.project}" is not a PROJECTS title`);
  if (hack.result && !(hack.period && hack.start && hack.end && hack.icon)) {
    fail(`HACKATHONS "${hack.event}"`, 'placed entries need period, start, end and icon for the timeline');
  }
}
for (const title of CV.projects) {
  if (!projectTitles.has(title.toLowerCase())) fail('CV.projects', `"${title}" is not a PROJECTS title`);
}
for (const skill of SKILLS) {
  if (skill.cert && !certTexts.has(skill.cert)) fail(`SKILLS "${skill.title}"`, `cert "${skill.cert}" is not a CERTIFICATIONS text`);
}

/* --- Uniqueness ------------------------------------------------------ */
const dupes = (list) => list.filter((v, i) => list.indexOf(v) !== i);
for (const id of dupes(PROJECTS.map((p) => p.id))) fail('PROJECTS', `duplicate id ${id}`);
for (const title of dupes(PROJECTS.map((p) => p.title))) fail('PROJECTS', `duplicate title "${title}"`);
for (const id of dupes(EXPERIENCE.map((e) => e.id))) fail('EXPERIENCE', `duplicate id ${id}`);
for (const id of dupes(ROLES.map((r) => r.id))) fail('ROLES', `duplicate id ${id}`);
for (const p of PROJECTS) {
  for (const tech of dupes(p.stack)) fail(`PROJECTS "${p.title}"`, `"${tech}" is listed twice`);
}

/* --- Files in public/ ------------------------------------------------ */
const checkAsset = (where, href) => {
  if (!href || !href.startsWith('/')) return;
  const file = path.join(root, 'public', decodeURIComponent(href));
  if (!existsSync(file)) fail(where, `file not found: public${decodeURIComponent(href)}`);
};
for (const p of PROJECTS) {
  if (!p.img.endsWith('.webp')) fail(`PROJECTS "${p.title}"`, 'img should be a .webp with a -640 sibling');
  checkAsset(`PROJECTS "${p.title}" img`, p.img);
  checkAsset(`PROJECTS "${p.title}" small img`, smallImage(p.img));
}
checkAsset('SITE.photo', SITE.photo);
checkAsset('SITE.photo (512px)', SITE.photo.replace(/\.webp$/, '-512.webp'));
checkAsset('SITE.ogImage', SITE.ogImage);
for (const c of CERTIFICATIONS) checkAsset(`CERTIFICATIONS "${c.text}"`, c.link);
for (const e of EDUCATION) checkAsset(`EDUCATION "${e.title}"`, e.link);

if (errors.length) {
  console.error(`check:data found ${errors.length} problem${errors.length > 1 ? 's' : ''} in src/data/portfolio.js:\n`);
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}
console.log(
  `check:data ok — ${Object.keys(TECH).length} tools, ${PROJECTS.length} projects, ` +
    `${HACKATHONS.length} hackathons, ${SKILLS.length} skills, ${ROLES.length} roles`,
);
