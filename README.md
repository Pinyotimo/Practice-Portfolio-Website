<h1 align="center">Stephen Oduor — Portfolio</h1>

<p align="center">
  Personal portfolio and generated CV for a software engineer in Nairobi, Kenya.
  <br />
  <a href="https://stephenoduor-software-developer-por.vercel.app/"><strong>Live site</strong></a>
  ·
  <a href="https://stephenoduor-software-developer-por.vercel.app/cv"><strong>CV</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-149eca?style=flat-square&logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white" alt="Vite 8">
  <img src="https://img.shields.io/badge/Framer_Motion-animation-0055ff?style=flat-square" alt="Framer Motion">
  <img src="https://img.shields.io/badge/Three.js-hero_scene-000000?style=flat-square&logo=threedotjs" alt="Three.js">
  <img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel" alt="Deployed on Vercel">
</p>

## What's in it

- **Home** — introduction, a lazy-loaded 3D hero scene and a marquee of every tool I use
- **About** — tabs for skills, core technologies, self-assessed proficiency, experience, education and hobbies
- **Impact** — charts built from the same records: experience timeline, where each project's stack sits, certificates by area
- **Services** and **Projects** — what I take on, and 14 projects with live links or case studies
- **Contact** — details, social links and a FormSubmit contact form
- **`/cv`** — a printable CV generated from the same data; *Download PDF* prints it to two A4 pages
- Six colour themes, keyboard-accessible tabs, and reduced-motion support

## One source of truth

All content lives in [`my-portfolio/src/data/portfolio.js`](my-portfolio/src/data/portfolio.js). Components are presentational, so updating the site means editing that file:

| Change | Edit |
| --- | --- |
| Name, role, email, site URL, photo | `SITE` |
| Roles I can take on — hero "I build …" line, About focus and role list, Services cards, CV headline | `ROLES` |
| A tool's name or chart category | `TECH_BY_DISCIPLINE` (the only place a tool is spelled) |
| Core tech tab / CV skills | `TECH_GROUPS` |
| Projects | `PROJECTS` — `stack` uses `TECH` names |
| Roles and hackathons | `ROLES`, `HACKATHONS` (placed hackathons become timeline awards) |
| Education and certificates | `EDUCATION`, `CERTIFICATIONS` |
| CV-only content | `CV` (headline, chosen projects, soft skills, references) |

Derived automatically, never hand-edited: the hero tool marquee, the stack chart, project counts on skills and tools, the experience timeline's awards, the `<head>` title, description, Open Graph and JSON-LD tags, the pre-paint theme map, `robots.txt` and `sitemap.xml`.

`npm run check:data` validates the cross-references (tool names, project titles, certificate names, image and PDF paths) and runs before every build, so drift fails the build instead of shipping.

## Getting started

```bash
cd my-portfolio
npm install
npm run dev        # local dev server
npm run check:data # validate portfolio.js
npm run lint       # oxlint
npm run build      # check:data + production build into dist/
```

### Adding a project image

Save a WebP up to 1280px wide to `public/Images/projects/<name>.webp` and a 640px copy as `<name>-640.webp`; set `img`, `imgWidth` and `imgHeight` in `PROJECTS`. `check:data` fails if either file is missing.

## Project structure

```text
my-portfolio/
├── index.html              # {{tokens}} filled from SITE and themes.js at build time
├── vite.config.js          # meta-tag, JSON-LD, robots.txt and sitemap generation
├── vercel.json             # SPA rewrite so /cv and /thanks load directly
├── scripts/check-data.mjs  # data validation
├── public/Images/          # photos, project screenshots, certificate PDFs
└── src/
    ├── data/portfolio.js   # all content
    ├── components/         # sections, tabs, charts, Cv page
    ├── theme/              # themes and the theme provider
    └── lib/                # motion presets, project-evidence lookup, shapes
```

## Author

**Stephen Oduor** — [GitHub](https://github.com/Pinyotimo) · [LinkedIn](https://www.linkedin.com/in/stephen-oduor-8817992b9/)

## License

This project is available for learning, practice, and portfolio inspiration.
