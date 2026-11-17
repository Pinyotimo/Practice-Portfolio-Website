/* Single source of truth for the portfolio's content — the website, the
   <head> meta tags (vite.config.js) and the CV page (/cv) all read from here.
   Components stay presentational; editing copy happens here.

   `npm run check:data` (also run before every build) validates the
   cross-references below: tool names, project titles, certificate names and
   asset paths. If it fails, fix the data, not the check. */

export const SITE = {
  name: 'Stephen Oduor',
  shortName: 'Steve',
  role: 'Software Engineer',
  location: 'Nairobi, Kenya',
  email: 'steveotieno2012005@gmail.com',
  url: 'https://stephenoduor-software-developer-por.vercel.app/',
  /* The CV is generated from this file at /cv; "Download PDF" prints it. */
  cvUrl: '/cv',
  /* Hero portrait (with a -512 sibling for small screens), and a JPG copy
     for link previews — not every platform renders WebP previews. */
  photo: '/Images/profile-photo.webp',
  ogImage: '/Images/profile-photo-og.jpg',
  title: 'Stephen Oduor — Software Engineer in Nairobi, Kenya',
  description:
    'Software engineer and Computer Science undergraduate in Nairobi. I build full-stack web applications, AI-assisted products, automation systems and data-rich prototypes across web, infrastructure and real-time workflows.',
};

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'impact', label: 'Impact' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

/* ------------------------------------------------------------------ */
/* Technology registry — the one place a tool's name is spelled        */
/* ------------------------------------------------------------------ */

/* Every tool named anywhere on the site (project stacks, the Core tech tab,
   the hero, skill evidence) must be one of these names, spelled exactly
   this way. The bucket is the tool's discipline in the "Where the stack
   sits" chart; `tooling` tools have none because they never sit in a
   project stack (Git is on every project). */
const TECH_BY_DISCIPLINE = {
  frontend: [
    'JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Vite', 'Zustand', 'TanStack Query',
    'Tailwind CSS', 'Base UI', 'React Router', 'shadcn/ui', 'Radix UI', 'Framer Motion',
    'Recharts', 'Leaflet', 'QR tickets',
  ],
  backend: [
    'Python', 'Java', 'C++', 'C', 'PHP', 'Node.js', 'Express', 'FastAPI', 'Uvicorn', 'Pydantic',
    'Django', 'JWT', 'bcrypt', 'Helmet', 'Multer', 'Joi', 'Zod', 'PHP sessions', 'Docker',
    'Docker Compose', 'Kubernetes', 'Azure Container Apps', 'pytest', 'GitHub API', 'ReportLab',
    'Africa’s Talking',
  ],
  data: [
    'PostgreSQL', 'Supabase', 'MongoDB', 'SQLite', 'Oracle', 'Redis', 'Socket.IO', 'NumPy',
    'Pandas', 'JSON file storage', 'OpenStreetMap', 'RSS', 'Reddit', 'yfinance', 'Matplotlib',
    'M-Pesa Daraja',
  ],
  ai: [
    'GitHub Actions', 'Ollama', 'Gemini', 'NVIDIA NIM', 'NVIDIA-hosted LLM API', 'Groq',
    'OpenAI SDK', 'OpenCV', 'Roboflow', 'Labelbox', 'Label Prism',
  ],
  tooling: ['Git', 'GitHub'],
};

/* Data sources, techniques and service names rather than tools — real, but
   left out of the hero's tool marquee. */
const NOT_IN_MARQUEE = new Set([
  'QR tickets', 'PHP sessions', 'JSON file storage', 'Uvicorn', 'GitHub API', 'OpenStreetMap',
  'RSS', 'Reddit', 'NVIDIA-hosted LLM API',
]);

/* name → { name, discipline, marquee } */
export const TECH = Object.fromEntries(
  Object.entries(TECH_BY_DISCIPLINE).flatMap(([discipline, names]) =>
    names.map((name) => [
      name,
      { name, discipline: discipline === 'tooling' ? null : discipline, marquee: !NOT_IN_MARQUEE.has(name) },
    ]),
  ),
);

/* ["A"] → "A", ["A","B"] → "A & B", ["A","B","C"] → "A, B & C" */
export const joinNames = (names) =>
  names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')} & ${names.at(-1)}`;

/* Core tech tab, also the CV's "Technical skills". Each item groups one or
   more TECH names under a shared description; the tile label is built from
   `tools` unless `label` overrides it. `icon` (optional) is a Font Awesome
   class for tools that have a logo; everything else gets a monogram tile.
   The project count comes from PROJECTS stacks — `count: false` hides it
   (used where every project applies, e.g. Git). */
const TECH_GROUPS = [
  {
    heading: 'Languages',
    icon: 'fa-solid fa-code',
    items: [
      { tools: ['JavaScript', 'TypeScript'], icon: 'fa-brands fa-js', desc: 'Type-safe modular logic and dynamic interfaces.' },
      { tools: ['Python'], icon: 'fa-brands fa-python', desc: 'Automation, rapid prototyping and backend logic.' },
      { tools: ['Java'], icon: 'fa-brands fa-java', desc: 'Robust cross-platform enterprise software.' },
      { tools: ['C++'], desc: 'High-performance applications and object-oriented structures.' },
      { tools: ['C'], desc: 'Low-level systems logic and custom memory management.' },
      { tools: ['PHP'], icon: 'fa-brands fa-php', desc: 'Server-rendered pages and session-based web apps.' },
      { tools: ['HTML', 'CSS'], icon: 'fa-brands fa-html5', desc: 'Semantic markup and responsive, hand-written layouts.' },
    ],
  },
  {
    heading: 'Frontend',
    icon: 'fa-solid fa-display',
    items: [
      { tools: ['React'], icon: 'fa-brands fa-react', desc: 'Building responsive user interfaces.' },
      { tools: ['Vite'], icon: 'fa-solid fa-bolt', desc: 'Fast development and production tooling for React applications.' },
      { tools: ['Zustand', 'TanStack Query'], desc: 'State management and server-state caching.' },
      { tools: ['Tailwind CSS', 'Base UI'], desc: 'Composable styling and interface primitives for React products.' },
      { tools: ['React Router', 'shadcn/ui', 'Radix UI'], desc: 'Composable navigation and interface primitives.' },
      { tools: ['Framer Motion'], desc: 'Layout and interaction animation for React interfaces.' },
      { tools: ['Recharts', 'Leaflet', 'OpenStreetMap'], icon: 'fa-solid fa-map-location-dot', desc: 'Charts and interactive map views for data-rich interfaces.' },
    ],
  },
  {
    heading: 'Backend & APIs',
    icon: 'fa-solid fa-server',
    items: [
      { tools: ['Node.js', 'Express'], icon: 'fa-brands fa-node-js', desc: 'Developing server-side APIs and services.' },
      { tools: ['FastAPI', 'Uvicorn'], desc: 'Building typed Python APIs for data-driven products.' },
      { tools: ['Pydantic'], desc: 'Validating structured analysis inputs, policies and decisions.' },
      { tools: ['Django'], desc: 'Building secure, rapid full-stack architectures.' },
      { label: 'APIs', tools: [], icon: 'fa-solid fa-plug', desc: 'Designing and consuming RESTful interfaces.' },
      { tools: ['JWT', 'bcrypt', 'Helmet'], icon: 'fa-solid fa-lock', desc: 'Authentication and baseline API security middleware.' },
      { tools: ['Multer', 'Joi', 'Zod'], desc: 'File uploads and structured request validation.' },
      { tools: ['PHP sessions', 'JSON file storage'], icon: 'fa-brands fa-php', desc: 'Session-based authentication and file-backed employee records.' },
    ],
  },
  {
    heading: 'Data & real-time',
    icon: 'fa-solid fa-database',
    items: [
      { tools: ['PostgreSQL', 'Supabase'], desc: 'Relational schemas and managed backend services — including property inventory, inspections and issue reports.' },
      { label: 'MongoDB / MERN', tools: ['MongoDB'], icon: 'fa-solid fa-leaf', desc: 'NoSQL data storage and full-stack integration.' },
      { tools: ['SQLite'], desc: 'Portable relational storage for focused products and repeatable demos.' },
      { tools: ['Oracle'], desc: 'Relational storage used by the Mavuno repository’s Docker Compose setup.' },
      { tools: ['Redis'], desc: 'In-memory data caching and message brokering.' },
      { tools: ['Socket.IO'], icon: 'fa-solid fa-tower-broadcast', desc: 'Real-time bidirectional communication.' },
      { tools: ['NumPy', 'Pandas', 'OpenCV'], desc: 'Data and image-processing foundations for AI service prototypes.' },
    ],
  },
  {
    heading: 'DevOps & cloud',
    icon: 'fa-solid fa-cloud',
    items: [
      { tools: ['Git', 'GitHub'], icon: 'fa-brands fa-github', count: false, desc: 'Version control, source code management and collaborative development.' },
      { tools: ['Docker'], icon: 'fa-brands fa-docker', desc: 'Containerizing applications for consistent deployment.' },
      { tools: ['Docker Compose'], icon: 'fa-brands fa-docker', desc: 'Starting reproducible local backend, frontend and database stacks.' },
      { tools: ['Kubernetes'], icon: 'fa-solid fa-dharmachakra', desc: 'Orchestrating containerized workloads — workload requests, policies and reviewable manifests.' },
      { tools: ['Azure Container Apps'], icon: 'fa-brands fa-microsoft', desc: 'Deploying containerized APIs and frontends.' },
      { tools: ['GitHub Actions'], icon: 'fa-solid fa-gears', desc: 'Scheduling repeatable collection, reporting and alert jobs.' },
      { tools: ['pytest'], icon: 'fa-solid fa-vial-circle-check', desc: 'Testing deterministic safety rules and recommendation behavior.' },
    ],
  },
  {
    heading: 'AI & automation',
    icon: 'fa-solid fa-robot',
    items: [
      { tools: ['Ollama'], desc: 'Running local large language models.' },
      { tools: ['Gemini', 'NVIDIA NIM', 'Ollama'], desc: 'Configurable AI providers for event assistance.' },
      { tools: ['NVIDIA-hosted LLM API'], desc: 'Optional narrative generation grounded in application evidence.' },
      { tools: ['Groq'], desc: 'Generating concise briefings from sourced findings.' },
      { tools: ['OpenAI SDK'], desc: 'Model client for the MAVUNO AI service.' },
      { label: 'AI Data Annotation', tools: ['Roboflow', 'Labelbox', 'Label Prism'], icon: 'fa-solid fa-tags', desc: 'Labelling images and text to build training datasets.' },
      { tools: ['GitHub API', 'RSS', 'Reddit'], icon: 'fa-solid fa-rss', desc: 'Collecting GitHub activity, technology news and community signals.' },
      { tools: ['yfinance'], icon: 'fa-solid fa-chart-line', desc: 'Reading watchlist and market data for configured thresholds.' },
      { tools: ['Matplotlib', 'ReportLab'], icon: 'fa-solid fa-file-pdf', desc: 'Rendering visual reports and PDFs from collected data.' },
    ],
  },
  {
    heading: 'Integrations',
    icon: 'fa-solid fa-puzzle-piece',
    items: [
      { tools: ['Africa’s Talking'], icon: 'fa-solid fa-comment-sms', desc: 'SMS, USSD and voice workflows for event communication and escalation.' },
      { tools: ['M-Pesa Daraja'], icon: 'fa-solid fa-mobile-screen-button', desc: 'Mobile-money integrations, including attendee payments.' },
      { tools: ['QR tickets'], icon: 'fa-solid fa-qrcode', desc: 'Supporting attendee check-in with scannable tickets.' },
    ],
  },
];

export const TECH_CATEGORIES = TECH_GROUPS.map((group) => ({
  ...group,
  items: group.items.map((item) => ({ ...item, tag: item.label ?? joinNames(item.tools) })),
}));

/* ------------------------------------------------------------------ */
/* Roles — the one description of what I can be hired to do            */
/* ------------------------------------------------------------------ */

/* Each role drives, in this order:
     - the hero's "I build …" rotation (`builds`, lead and also roles)
     - About's Focus / Also into highlights (`area`) and its role list
     - the Services cards (`service`, `icon`, `desc`, `tools`)
     - the CV headline (lead roles)
   `tier`: 'lead' roles are what I'm hired for first (double-width cards),
   'also' roles I take on alongside them, 'support' roles I can help with.
   `skills` are SKILLS titles — their project evidence and certificates back
   the Services card. `tools` must appear on one of those Skills cards.
   The last role is shown as the full-width banner card on desktop. */
export const ROLES = [
  {
    id: 'fullstack',
    tier: 'lead',
    title: 'Full-Stack Web Developer',
    area: 'Full-stack web',
    builds: 'full-stack web products',
    service: 'Web & App Development',
    icon: 'fa-solid fa-code',
    desc: 'Full-stack web applications built on React and Node — typed, tested and deployed rather than demoed, from the interface down to the API and database, responsive from a 360px phone to a wide desktop, mobile-money payments included.',
    tools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'M-Pesa Daraja'],
    skills: ['Web Development', 'Software Engineering', 'E-commerce Tools'],
  },
  {
    id: 'automation',
    tier: 'also',
    title: 'Automation & Data Developer',
    area: 'Data automation',
    builds: 'data & automation systems',
    service: 'Automation & Data Pipelines',
    icon: 'fa-solid fa-gears',
    desc: 'Scheduled pipelines that collect, rank and report data without manual steps — from market watchlists to news briefings delivered by email and Telegram.',
    tools: ['Python', 'GitHub Actions', 'Pandas', 'Matplotlib'],
    skills: ['Automation & Data Pipelines'],
  },
  {
    id: 'devops',
    tier: 'also',
    title: 'Cloud & DevOps Engineer',
    area: 'Cloud FinOps',
    builds: 'infrastructure FinOps tooling',
    service: 'Cloud, DevOps & Linux',
    icon: 'fa-solid fa-cloud',
    desc: 'Containerising and deploying services, working comfortably on Linux servers and scripting the repetitive parts — and reasoning about what infrastructure costs to run, down to evidence-backed Kubernetes rightsizing.',
    tools: ['Docker', 'Kubernetes', 'Command line', 'Shell scripting'],
    skills: ['Cloud & DevOps', 'Linux & Systems'],
  },
  {
    id: 'ai',
    tier: 'lead',
    title: 'AI Integration Developer',
    area: 'AI products',
    builds: 'explainable AI tools',
    service: 'AI Integration',
    icon: 'fa-solid fa-robot',
    desc: 'Wiring local and hosted language models into real products, preparing and labelling training data, and turning model output into explanations a person can review.',
    tools: ['Ollama', 'Gemini', 'Groq', 'OpenAI SDK', 'Roboflow'],
    skills: ['AI & LLM Integration', 'AI Data Annotation'],
  },
  {
    id: 'uiux',
    tier: 'support',
    title: 'UI/UX Designer',
    area: 'UI/UX',
    service: 'UI/UX Design',
    icon: 'fa-solid fa-pen-ruler',
    desc: 'Interfaces designed against real constraints: readable type scales, sensible spacing, accessible contrast and motion that clarifies rather than decorates.',
    tools: ['Design systems', 'Accessibility', 'Motion'],
    skills: ['UI/UX Design'],
  },
  {
    id: 'security',
    tier: 'support',
    title: 'Entry-level Cybersecurity Support',
    area: 'Security',
    service: 'Cybersecurity',
    icon: 'fa-solid fa-shield-halved',
    desc: 'Security awareness, vulnerability thinking and beginner penetration-testing concepts, applied to keeping shipped systems and their users safer.',
    tools: ['Security awareness', 'Pentesting concepts'],
    skills: ['Cybersecurity Basics'],
  },
  {
    id: 'network',
    tier: 'support',
    title: 'IT Support & Network Technician',
    area: 'IT & networking',
    service: 'IT Support & Network Design',
    icon: 'fa-solid fa-network-wired',
    desc: 'Support, troubleshooting and network design grounded in HCIA and Network Technician training — from IP addressing and subnetting to structured cabling and small-business LANs.',
    tools: ['Troubleshooting', 'IP addressing', 'LAN design', 'Secure communication'],
    skills: ['Networking'],
  },
];

export const ROLE_TIERS = [
  { id: 'lead', label: 'Lead roles' },
  { id: 'also', label: 'Also take on' },
  { id: 'support', label: 'Can support' },
];

export const rolesIn = (tier) => ROLES.filter((role) => role.tier === tier);

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  kicker: 'Open to internships & freelance work',
  heading: 'Hi, I’m',
  highlight: 'Steve',
  lead:
    'Software engineer and Computer Science student at The Co-operative University of Kenya, based in Nairobi. I build end-to-end products — event and farming platforms, explainable AI, FinOps tools — with clear interfaces and honest limits.',
  /* Headline tools (About's code card shows the first three). TECH names. */
  tools: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL'],
  /* Every tool from the Core tech tab, in tab order, once each — the
     marquee under the hero. Derived, so it can't drift from the tab. */
  stack: [
    ...new Set(TECH_CATEGORIES.flatMap((c) => c.items.flatMap((i) => i.tools))),
  ].filter((name) => TECH[name]?.marquee),
  /* Cycled under the heading: "I build …" — lead roles first, then the
     ones I also take on. */
  roles: [...rolesIn('lead'), ...rolesIn('also')].map((role) => role.builds),
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  kicker: 'Who I am',
  title: 'About me',
  lead:
    'A short version: I build things end to end, make complex workflows easier to understand, and document what is real, provisional and still in progress.',
  body:
    'I build responsive, well-structured applications and care about the details that make them feel considered — layout, motion, accessibility, and the code underneath. My recent work spans explainable match insights, scheduled intelligence briefings, Kubernetes cost recommendations, vision-assisted operations, event communication and agricultural coordination. Across all of them, I prefer deterministic rules, human review and clear evidence over unsupported claims.',
  highlights: [
    { label: 'Focus', value: joinNames(rolesIn('lead').map((r) => r.area)), icon: 'fa-solid fa-layer-group', key: 'focus' },
    { label: 'Also into', value: joinNames(rolesIn('also').map((r) => r.area)), icon: 'fa-solid fa-diagram-project', key: 'alsoInto' },
    { label: 'Based in', value: SITE.location, icon: 'fa-solid fa-location-dot', key: 'basedIn' },
  ],
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

/* The Services cards — one per role, in ROLES order. Lead roles take a
   double-width tile. */
export const SERVICES = ROLES.map((role) => ({
  id: role.id,
  role: role.title,
  title: role.service,
  icon: role.icon,
  featured: role.tier === 'lead',
  desc: role.desc,
  tools: role.tools,
  skills: role.skills,
}));

export const SERVICES_INTRO = `${ROLES.length} roles I can take on — leading a full-stack or AI build, automating the data and infrastructure around it, and supporting the design, security and network underneath.`;

/* ------------------------------------------------------------------ */
/* Projects — `stack` drives both the cards and the stack chart      */
/* ------------------------------------------------------------------ */

/* `img` is a WebP up to 1280px wide with a `-640` sibling for phones
   (both checked by check:data); imgWidth/imgHeight are the large file's. */
export const smallImage = (src) => src.replace(/\.webp$/, '-640.webp');

export const DISCIPLINES = {
  frontend: {
    key: 'frontend',
    label: 'Frontend & UI',
    color: 'var(--chart-1)',
    ink: 'var(--chart-1-ink)',
  },
  backend: {
    key: 'backend',
    label: 'Backend & API',
    color: 'var(--chart-2)',
    ink: 'var(--chart-2-ink)',
  },
  data: {
    key: 'data',
    label: 'Data & real-time',
    color: 'var(--chart-3)',
    ink: 'var(--chart-3-ink)',
  },
  /* LLM and vision integrations, plus the scheduled automation around them */
  ai: {
    key: 'ai',
    label: 'AI & automation',
    color: 'var(--chart-4)',
    ink: 'var(--chart-4-ink)',
  },
};

export const PROJECTS = [
  {
    id: 1,
    img: '/Images/projects/smartauction.webp',
    imgPosition: 'center', // a photo, not a page screenshot
    imgWidth: 1280,
    imgHeight: 853,
    title: 'SmartAuction B2B',
    desc: 'A B2B auction platform built for Davis & Shirtliff — live bidding over Socket.IO, server state cached with TanStack Query. Runner-up at the hackathon.',
    stack: ['React', 'TypeScript', 'TanStack Query', 'Zustand', 'Socket.IO'],
    href: 'https://auction.dayliff.com/',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View SmartAuction live',
    type: 'Live site',
  },
  {
    id: 2,
    img: '/Images/projects/kiliplanner.webp',
    imgWidth: 1266,
    imgHeight: 581,
    title: 'KiliPlanner',
    desc: 'A civic issue-reporting platform for Kilimani Ward. Residents can report local problems with a location and photo, follow the community feed, and support or comment on reports; planners and officials can map, filter, update and export issues. Working prototype: parts of the database schema and access policies still need to catch up with the frontend.',
    stack: ['React', 'Supabase', 'Leaflet', 'OpenStreetMap'],
    href: 'https://kiliplanner1.vercel.app/',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View KiliPlanner live',
    type: 'Live site',
  },
  {
    id: 3,
    img: '/Images/projects/eldec.webp',
    imgWidth: 1267,
    imgHeight: 582,
    title: 'ELDEC Limited Components',
    desc: 'Production React components for ELDEC Limited, an electrical and ELV consultancy — a rebuild that kept their content model intact.',
    stack: ['React'],
    href: 'https://eldecengineering.com/',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View ELDEC Limited live',
    type: 'Client work',
  },
  {
    id: 4,
    img: '/Images/projects/pharmacy.webp',
    imgWidth: 1265,
    imgHeight: 585,
    title: 'Pharmacy Management System',
    desc: 'A team-built pharmacy platform covering product catalogues, stock and a shopping cart, designed to stay usable on a phone.',
    stack: ['React', 'Node.js'],
    href: 'https://pharmaos-app.netlify.app',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View Pharmacy Management System live',
    type: 'Team project',
  },
  {
    id: 5,
    img: '/Images/projects/portfolio-website.webp',
    imgPosition: 'center', // a photo, not a page screenshot
    imgWidth: 1280,
    imgHeight: 761,
    title: 'Portfolio Website',
    desc: 'This site — built from scratch with a hand-written design system, dark mode, and a dependency-free charting layer.',
    stack: ['React', 'Vite', 'JavaScript', 'CSS', 'Framer Motion'],
    href: 'https://github.com/Pinyotimo/Practice-Portfolio-Website',
    icon: 'fa-brands fa-github',
    label: 'View Portfolio Website on GitHub',
    type: 'Open source',
  },
  {
    id: 6,
    img: '/Images/projects/employee-management.webp',
    imgPosition: 'center', // a photo, not a page screenshot
    imgWidth: 1280,
    imgHeight: 853,
    title: 'Employee Management System',
    desc: 'A lightweight employee and payroll management system for multiple companies. Admins create employee accounts and assign work; employees can clock in only when assigned a task, track breaks and manage profiles, with password hashing and token-based password reset.',
    stack: ['PHP', 'HTML', 'CSS', 'JavaScript', 'PHP sessions', 'JSON file storage'],
    href: 'https://github.com/Pinyotimo/Employee-Management-System',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View Employee Management System on GitHub',
    type: 'Open source',
  },
  {
    id: 7,
    img: '/Images/projects/why-it-happened.webp',
    imgWidth: 1033,
    imgHeight: 573,
    title: 'Why It Happened',
    desc: 'An explainable football match-insights engine for the Inside the Game developer hackathon (Microsoft × Premier League). Deterministic rules find key moments and supporting event IDs; an optional LLM narrates the evidence without deciding what happened.',
    stack: [
      'Python',
      'FastAPI',
      'SQLite',
      'React',
      'TypeScript',
      'Vite',
      'NVIDIA-hosted LLM API',
      'Azure Container Apps',
    ],
    href: null,
    icon: 'fa-solid fa-circle-info',
    label: 'Why It Happened case study',
    type: 'Hackathon build',
  },
  {
    id: 8,
    img: '/Images/projects/techwatch.webp',
    imgWidth: 971,
    imgHeight: 1600,
    title: 'TechWatch',
    desc: 'A scheduled personal intelligence briefing that collects GitHub activity, technology news, Reddit posts, Nairobi events and watchlist data, then delivers ranked reports and deduplicated alerts by email and Telegram.',
    stack: [
      'Python',
      'GitHub Actions',
      'GitHub API',
      'RSS',
      'Reddit',
      'yfinance',
      'Matplotlib',
      'ReportLab',
      'Groq',
    ],
    href: null,
    icon: 'fa-solid fa-circle-info',
    label: 'TechWatch case study',
    type: 'Automation system',
  },
  {
    id: 9,
    img: '/Images/projects/finops-agent.webp',
    imgWidth: 995,
    imgHeight: 579,
    title: 'Kubernetes Over-Provisioning FinOps Agent',
    desc: 'A recommendation-only Kubernetes rightsizing tool that turns historical CPU and memory usage into evidence-backed request proposals, deterministic safety decisions and review-only YAML patches. It never applies changes to a cluster.',
    stack: ['Python', 'FastAPI', 'Pydantic', 'React', 'TypeScript', 'Vite', 'Kubernetes', 'pytest'],
    href: null,
    icon: 'fa-solid fa-circle-info',
    label: 'FinOps Agent case study',
    type: 'Infrastructure tool',
  },
  {
    id: 10,
    img: '/Images/projects/movemate.webp',
    imgWidth: 1017,
    imgHeight: 556,
    title: 'MoveMate Host Edition',
    desc: 'A rental-turnover assistant built for the Meta AI hackathon. Hosts record property inventory once, then use vision-assisted room scans, cleaner inspections, readiness reports and guest issue guidance with every AI suggestion requiring human confirmation.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'React', 'Vite', 'Docker Compose'],
    href: null,
    icon: 'fa-solid fa-circle-info',
    label: 'MoveMate case study',
    type: 'Hackathon build',
  },
  {
    id: 11,
    img: '/Images/projects/event-management.webp',
    imgWidth: 1271,
    imgHeight: 586,
    title: 'AI-Powered Event Management System',
    desc: 'An offline-inclusive event concierge built for the AT Women in Tech Nairobi Hackathon. Africa’s Talking messaging and voice services support SMS or USSD attendee help, organizer operations, and emergency escalation, while the companion site presents M-Pesa registration and QR tickets.',
    stack: [
      'React',
      'TypeScript',
      'JavaScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'Supabase',
      'PostgreSQL',
      'Africa’s Talking',
      'M-Pesa Daraja',
      'Gemini',
      'NVIDIA NIM',
      'Ollama',
    ],
    href: 'https://ai-powered-event-management-system.vercel.app/',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View AI-Powered Event Management System live',
    type: 'Hackathon build',
  },
  {
    id: 12,
    img: '/Images/projects/mavuno.webp',
    imgWidth: 1259,
    imgHeight: 599,
    title: 'MAVUNO Green Grid',
    desc: 'A team-of-four agricultural platform prototype for CUK Innovation Week. Its repository combines a React/Vite frontend, Express API, FastAPI/Uvicorn AI service and Oracle-backed Docker Compose stack, with modules for harvest risk, buyer matching and resource allocation. The deployed frontend uses local sample data and is not connected to the Python modules or a live database.',
    stack: [
      'React',
      'JavaScript',
      'Vite',
      'Tailwind CSS',
      'shadcn/ui',
      'Base UI',
      'Recharts',
      'Leaflet',
      'Node.js',
      'Express',
      'FastAPI',
      'Uvicorn',
      'OpenAI SDK',
      'Pydantic',
      'NumPy',
      'Pandas',
      'OpenCV',
      'Oracle',
      'Docker Compose',
    ],
    href: 'https://mavuno-green-grid.vercel.app/#/farmer',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View Mavuno Green Grid live',
    type: 'Innovation Week build',
  },
  {
    id: 13,
    img: '/Images/projects/real-estate.webp',
    imgWidth: 1011,
    imgHeight: 545,
    title: 'Real Estate Management System',
    desc: 'A full-stack property management app with separate admin, agent and tenant workflows. Users browse and search listings, view property media and send inquiries; agents track rent, occupancy, expenses and inquiries while tenants view assigned units and submit complaints or payment information.',
    stack: ['React', 'Vite', 'Express', 'MongoDB'],
    href: 'https://github.com/Pinyotimo/Real-Estate-Management-System',
    icon: 'fa-brands fa-github',
    label: 'View Real Estate Management System on GitHub',
    type: 'Open source',
  },
  {
    id: 14,
    img: '/Images/projects/shopke.webp',
    imgWidth: 964,
    imgHeight: 590,
    title: 'ShopKE E-Commerce',
    desc: 'A full-stack Kenyan e-commerce platform with product, order, payment and refund workflows backed by PostgreSQL. Customers can pay through M-Pesa STK Push via Safaricom Daraja, while Leaflet-powered delivery features calculate location and distance details.',
    stack: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'M-Pesa Daraja',
      'Leaflet',
    ],
    href: 'https://github.com/Pinyotimo/ShopKE-E-Commerce-SIte',
    icon: 'fa-brands fa-github',
    label: 'View ShopKE E-Commerce on GitHub',
    type: 'Open source',
  },
];

/* Per-project technology counts, split by discipline — feeds the stacked bar. */
export const PROJECT_STACK_ROWS = PROJECTS.map((project) => {
  const counts = { frontend: 0, backend: 0, data: 0, ai: 0 };
  project.stack.forEach((tech) => {
    const key = TECH[tech]?.discipline;
    if (key) counts[key] += 1;
  });
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0);
  return { id: project.id, title: project.title, counts, total };
});

/* ------------------------------------------------------------------ */
/* Experience — the timeline chart reads the same records             */
/* ------------------------------------------------------------------ */

/* `project` must match a PROJECTS title (case-insensitive) — the tab pulls
   the stack and live link from there. Placed entries carry a `result` and
   dates; they also appear in EXPERIENCE as awards, so they're written once. */
export const HACKATHONS = [
  {
    id: 1,
    event: 'Davis & Shirtliff hackathon',
    project: 'SmartAuction B2B',
    result: 'Runner-up',
    icon: 'fa-solid fa-trophy',
    period: 'May 2026 – August 2026',
    start: '2026-05',
    end: '2026-08',
    desc: 'Built a live B2B auction platform with React, TypeScript, TanStack Query, Zustand and Socket.IO.',
  },
  {
    id: 2,
    event: '5th Annual Kilimani Urban Hackathon',
    project: 'KiliPlanner',
    result: 'Finalist',
    icon: 'fa-solid fa-medal',
    period: 'September 2026',
    start: '2026-09',
    end: '2026-09',
    desc: 'Developed a live reporting map for infrastructure and environmental issues across Kilimani Ward.',
  },
  {
    id: 3,
    event: 'Microsoft × Premier League Hackathon',
    project: 'Why It Happened',
    desc: 'Built an explainable football match-insights engine that links every narrative to deterministic match evidence.',
  },
  {
    id: 4,
    event: 'Gen AI Hackathon',
    project: 'Kubernetes Over-Provisioning FinOps Agent',
    desc: 'Built a recommendation-only Kubernetes rightsizing tool with deterministic safety checks, evidence trails and review-only YAML patches.',
  },
  {
    id: 5,
    event: 'Meta AI hackathon',
    project: 'MoveMate Host Edition',
    desc: 'Built a rental-turnover assistant using vision-assisted inventory scans, cleaner inspections and human-reviewed guest issue guidance.',
  },
  {
    id: 6,
    event: 'AT Women in Tech Nairobi Hackathon',
    project: 'AI-Powered Event Management System',
    desc: 'Built an offline-inclusive event concierge with Africa’s Talking messaging and voice services, SMS or USSD help, organizer operations and emergency escalation.',
  },
  {
    id: 7,
    event: 'CUK Innovation Week',
    project: 'MAVUNO Green Grid',
    desc: 'Built an agricultural coordination platform with farmer, partner and admin workflows for harvest risk, market opportunities, storage and transport.',
  },
];

/* Roles and engagements. `highlights` are the bullet points shown on the
   timeline cards and the CV. */
const POSITIONS = [
  {
    id: 'skillyme',
    kind: 'work',
    icon: 'fa-solid fa-laptop-code',
    period: 'March 2026 – Present',
    start: '2026-03',
    end: null,
    ongoing: true,
    role: 'Web Developer',
    company: 'SkillyMe Africa',
    highlights: [
      'Developing responsive and scalable web applications.',
      'Designing modern user interfaces and improving user experience.',
      'Collaborating with teams to deliver digital solutions.',
    ],
  },
  {
    id: 'gaotek',
    kind: 'work',
    icon: 'fa-solid fa-pen-nib',
    period: 'Jan 2026 – March 2026',
    start: '2026-01',
    end: '2026-03',
    role: 'AI Technical Writing Intern',
    company: 'GAO TEK',
    highlights: [
      'Created technical documentation and AI-related content.',
      'Conducted software and technology research.',
      'Assisted in AI workflow documentation and reporting.',
    ],
  },
  {
    id: 'property-hub',
    kind: 'freelance',
    icon: 'fa-solid fa-house-laptop',
    period: 'Nov 2025 – Dec 2025',
    start: '2025-11',
    end: '2025-12',
    role: 'Freelance Web Developer',
    company: 'Property Hub Website',
    highlights: [
      'Designed and developed a responsive property website.',
      'Improved website accessibility and user experience.',
      'Implemented clean UI/UX design principles.',
    ],
  },
];

/* Placed hackathons become award rows, so the timeline and the Hackathons
   list can't disagree. */
export const EXPERIENCE = [
  ...HACKATHONS.filter((hack) => hack.result).map((hack) => ({
    id: `hackathon-${hack.id}`,
    kind: 'award',
    icon: hack.icon,
    period: hack.period,
    start: hack.start,
    end: hack.end,
    role: hack.result,
    company: hack.event,
    desc: hack.desc,
    highlights: [],
  })),
  ...POSITIONS,
];

/* ------------------------------------------------------------------ */
/* Education & certifications                                           */
/* ------------------------------------------------------------------ */

export const EDUCATION = [
  {
    kind: 'degree',
    icon: 'fa-solid fa-graduation-cap',
    label: '2024 – 2028',
    title: 'BSc Computer Science',
    institution: 'The Co-operative University of Kenya',
    link: null,
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-robot',
    label: 'December 2025',
    title: 'AI for Software Development Training',
    institution: 'Moringa School',
    area: 'Data & AI',
    link: '/Images/Moringa AI course certificate.pdf',
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-code',
    label: 'Nov 2025',
    title: 'Web Development Bootcamp',
    institution: 'eMobilis Technology Training Institute',
    link: null,
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-network-wired',
    label: 'Sep 2025 – Jan 2026',
    title: 'Huawei Certified ICT Associate (HCIA)',
    institution: 'Huawei Kenya',
    link: null,
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-shield-halved',
    label: 'Sep – Dec 2024',
    title: 'Digital Safety & Security Awareness',
    institution: 'Cisco Networking Academy',
    area: 'Cybersecurity',
    link: '/Images/Digital_Safety_and_Security_Awareness_certificate_steveotieno2012005-gmail-com_2726ea6b-fe42-4882-9c63-3cf4db38f68d.pdf',
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-people-group',
    label: '2025',
    title: 'Aspire Leaders Program',
    institution: 'Aspire Institute',
    area: 'Leadership',
    link: '/Images/Aspire Institute Badge.pdf',
  },
  {
    kind: 'degree',
    icon: 'fa-solid fa-school',
    label: 'Jan 2020 – Nov 2023',
    title: 'Kenya Certificate of Secondary Education (KCSE)',
    institution: 'Sawagongo National School',
    link: null,
  },
];

export const CERTIFICATIONS = [
  {
    label: 'Networking',
    text: 'Network Technician Career Path',
    link: '/Images/Network_Technician_Career_Path_certificate_steveotieno2012005-gmail-com_533a845c-5571-4797-b1d4-96ac69b89c91 (1).pdf',
    area: 'Networking',
  },
  {
    label: 'Cybersecurity',
    text: 'Commonwealth Introduction to Cybersecurity',
    link: '/Images/Common Wealth Introduction to Cybersecurity Cert.pdf',
    area: 'Cybersecurity',
  },
  {
    label: 'Data Analytics',
    text: 'Data Analytics Certificate',
    link: '/Images/Data Analytics Certificate.pdf',
    area: 'Data & AI',
  },
  {
    label: 'Digital Literacy',
    text: 'Disinformation and Misinformation Certification',
    link: '/Images/Disinformation Misinformation Certification.pdf',
    area: 'Digital skills',
  },
  {
    label: 'Digital Skills',
    text: 'DDCN Certificate',
    link: '/Images/DDCN cert.pdf',
    area: 'Digital skills',
  },
  {
    label: 'Learn-A-Thon 2025',
    text: 'Learn-A-Thon Certificate',
    link: '/Images/Learn-A-Thon_2025_certificate_steveotieno2012005-gmail-com_.pdf',
    area: 'Digital skills',
  },
  {
    label: 'Gen AI Hackathon',
    text: 'Gen AI Hackathon Certificate',
    link: '/Images/GEN AI Hackathon Certificate.pdf',
    area: 'Data & AI',
  },
];

/* Every certificate on the site — the Certifications list plus the
   education entries that come with one — counted by area. */
export const ALL_CERTIFICATES = [
  ...CERTIFICATIONS,
  ...EDUCATION.filter((item) => item.link).map((item) => ({
    text: `${item.title} — ${item.institution}`,
    link: item.link,
    area: item.area,
  })),
];

export const CERT_AREAS = Object.entries(
  ALL_CERTIFICATES.reduce((acc, cert) => ({ ...acc, [cert.area]: (acc[cert.area] ?? 0) + 1 }), {}),
).map(([area, count]) => ({ area, count }));

/* ------------------------------------------------------------------ */
/* Skills & core technologies                                          */
/* ------------------------------------------------------------------ */

/* Skills tab. `group` keys into SKILL_GROUPS. `tools` are the chips shown
   on the card (and the vocabulary SERVICES draws its tools from).
   `evidence` lists TECH names; any project whose stack contains one counts
   as evidence for the skill, so "Used in N projects" stays true as PROJECTS
   changes. `cert` must match a CERTIFICATIONS `text`. */
export const SKILL_GROUPS = [
  { id: 'build', label: 'Build', icon: 'fa-solid fa-code' },
  { id: 'ai', label: 'AI & data', icon: 'fa-solid fa-brain' },
  { id: 'infra', label: 'Infra & security', icon: 'fa-solid fa-server' },
  { id: 'craft', label: 'Design & support', icon: 'fa-solid fa-pen-ruler' },
];

export const SKILLS = [
  {
    title: 'Web Development',
    desc: 'Building responsive, full-stack web applications — from the interface down to the API and database.',
    icon: 'fa-solid fa-laptop-code',
    group: 'build',
    tools: ['React', 'Vite', 'Node.js & Express', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    evidence: ['React', 'Express', 'HTML'],
  },
  {
    title: 'Software Engineering',
    desc: 'Writing scalable, readable code with typed models, tests and version control.',
    icon: 'fa-solid fa-diagram-project',
    group: 'build',
    tools: ['TypeScript', 'FastAPI & Pydantic', 'pytest', 'Git & GitHub'],
    evidence: ['TypeScript', 'Pydantic', 'pytest'],
  },
  {
    title: 'E-commerce Tools',
    desc: 'Building and managing web stores, including local payment flows such as M-Pesa.',
    icon: 'fa-solid fa-cart-shopping',
    group: 'build',
    tools: ['Shopify', 'M-Pesa Daraja'],
    evidence: ['M-Pesa Daraja'],
  },
  {
    title: 'AI & LLM Integration',
    desc: 'Wiring local and hosted language models into real products, with output a person can review.',
    icon: 'fa-solid fa-wand-magic-sparkles',
    group: 'ai',
    tools: ['Ollama', 'Groq', 'Gemini', 'OpenAI SDK', 'NVIDIA NIM'],
    evidence: ['NVIDIA-hosted LLM API', 'Groq', 'Gemini', 'OpenAI SDK', 'Ollama', 'NVIDIA NIM'],
  },
  {
    title: 'Automation & Data Pipelines',
    desc: 'Scheduled jobs that collect, rank and report data without manual steps.',
    icon: 'fa-solid fa-gears',
    group: 'ai',
    tools: ['Python', 'GitHub Actions', 'Pandas', 'Matplotlib'],
    evidence: ['GitHub Actions', 'Pandas', 'yfinance'],
    cert: 'Data Analytics Certificate',
  },
  {
    title: 'AI Data Annotation',
    desc: 'Labelling data to train computer vision and language models.',
    icon: 'fa-solid fa-tags',
    group: 'ai',
    tools: ['Roboflow', 'Labelbox', 'Label Prism'],
    evidence: [],
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Containerising and deploying services — and reasoning about what they cost to run.',
    icon: 'fa-solid fa-cloud',
    group: 'infra',
    tools: ['Docker Compose', 'Kubernetes', 'Azure Container Apps', 'GitHub Actions'],
    evidence: ['Docker', 'Docker Compose', 'Kubernetes', 'Azure Container Apps', 'GitHub Actions'],
  },
  {
    title: 'Networking',
    desc: 'Network fundamentals, connectivity, troubleshooting and secure system communication.',
    icon: 'fa-solid fa-network-wired',
    group: 'infra',
    tools: ['Connectivity', 'Troubleshooting', 'IP addressing', 'LAN design', 'Secure communication'],
    evidence: [],
    cert: 'Network Technician Career Path',
  },
  {
    title: 'Cybersecurity Basics',
    desc: 'Foundational security awareness, vulnerability thinking and beginner pentesting concepts.',
    icon: 'fa-solid fa-shield-halved',
    group: 'infra',
    tools: ['Security awareness', 'Vulnerability thinking', 'Pentesting concepts'],
    evidence: [],
    cert: 'Commonwealth Introduction to Cybersecurity',
  },
  {
    title: 'Linux & Systems',
    desc: 'Setting up servers and dev environments, managing services and containers, and scripting the repetitive parts.',
    icon: 'fa-brands fa-linux',
    group: 'infra',
    tools: ['Command line', 'Shell scripting', 'Docker'],
    evidence: ['Docker', 'Docker Compose'],
  },
  {
    title: 'UI/UX Design',
    desc: 'Designing intuitive web and app interfaces — layout, motion, accessibility and design systems.',
    icon: 'fa-solid fa-palette',
    group: 'craft',
    tools: ['Design systems', 'Accessibility', 'Motion', 'shadcn/ui'],
    evidence: ['Tailwind CSS', 'shadcn/ui'],
  },
  {
    title: 'Virtual Assistance',
    desc: 'Supporting digital workflows — research, scheduling, documentation and online task management.',
    icon: 'fa-solid fa-headset',
    group: 'craft',
    tools: ['Research', 'Scheduling', 'Documentation'],
    evidence: [],
  },
];

/* Self-assessed proficiency, 1–5. Labelled as self-assessed on the chart so
   it is never mistaken for a measured or certified result. */
export const PROFICIENCY = [
  {
    heading: 'Frontend & UI',
    icon: 'fa-solid fa-palette',
    items: [
      { tag: 'React', level: 5 },
      { tag: 'HTML & CSS', level: 5 },
      { tag: 'JavaScript & TypeScript', level: 4 },
      { tag: 'UI/UX & interface design', level: 4 },
    ],
  },
  {
    heading: 'Backend & data',
    icon: 'fa-solid fa-server',
    items: [
      { tag: 'Node.js & Express', level: 4 },
      { tag: 'REST API design', level: 4 },
      { tag: 'PostgreSQL & Supabase', level: 4 },
      { tag: 'MongoDB', level: 3 },
    ],
  },
  {
    heading: 'DevOps & AI',
    icon: 'fa-solid fa-robot',
    items: [
      { tag: 'Git & GitHub', level: 4 },
      { tag: 'Docker', level: 3 },
      { tag: 'AI data annotation', level: 4 },
      { tag: 'Ollama & local models', level: 3 },
    ],
  },
  {
    heading: 'Networking & security',
    icon: 'fa-solid fa-shield-halved',
    items: [
      { tag: 'Networking fundamentals', level: 4 },
      { tag: 'Network troubleshooting', level: 3 },
      { tag: 'Cybersecurity essentials', level: 3 },
      { tag: 'Security awareness', level: 4 },
    ],
  },
];

export const HOBBIES = [
  { title: 'Travelling', icon: 'fa-solid fa-plane-departure', desc: 'Exploring new places, cultures and perspectives across Kenya and beyond.' },
  { title: 'Reading', icon: 'fa-solid fa-book-open', desc: 'Technical books, biographies, and anything that sharpens the way I think.' },
  { title: 'Hiking', icon: 'fa-solid fa-person-hiking', desc: 'Trails, hills and long walks outdoors — the best way I know to stay active and clear my head.' },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export const SOCIAL_LINKS = [
  { id: 'linkedin', href: 'https://www.linkedin.com/in/stephen-oduor-8817992b9', icon: 'fa-brands fa-linkedin', label: 'LinkedIn' },
  { id: 'github', href: 'https://github.com/Pinyotimo', icon: 'fa-brands fa-github', label: 'GitHub' },
  { id: 'twitter', href: 'https://twitter.com/Pinyotimoburu', icon: 'fa-brands fa-twitter', label: 'X / Twitter' },
  { id: 'facebook', href: 'https://www.facebook.com/Steve%20Otieno', icon: 'fa-brands fa-facebook', label: 'Facebook' },
  { id: 'instagram', href: 'https://www.instagram.com/steveotieno858/', icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { id: 'tiktok', href: 'https://www.tiktok.com/@otieno_oduor1', icon: 'fa-brands fa-tiktok', label: 'TikTok' },
  { id: 'reddit', href: 'https://www.reddit.com/user/Pinyotimoburu', icon: 'fa-brands fa-reddit', label: 'Reddit' },
];

export const CONTACT_DETAILS = [
  {
    icon: 'fa-solid fa-envelope',
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  { icon: 'fa-solid fa-phone', label: 'Phone', value: '+254 769 493 697', href: 'tel:+254769493697' },
  {
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp',
    value: '+254 750 779 480',
    href: 'https://wa.me/254750779480',
    external: true,
  },
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: SITE.location, href: null },
];

/* ------------------------------------------------------------------ */
/* CV — only what the website doesn't already say                      */
/* ------------------------------------------------------------------ */

/* Everything else on the CV page (/cv) — contact details, summary,
   experience, hackathons, projects, skills, education, certificates — is
   read from the exports above. */
export const CV = {
  /* The umbrella title, then the lead roles. */
  headline: [SITE.role, ...rolesIn('lead').map((role) => role.title)],
  summary: SITE.description,
  /* PROJECTS titles, in the order they appear on the CV. The other
     hackathon builds are still summarised under "Hackathons & awards".
     Adding one here pushes the printed CV onto a third page. */
  projects: [
    'SmartAuction B2B',
    'KiliPlanner',
  ],
  softSkills: [
    'Problem solving',
    'Teamwork & collaboration',
    'Communication',
    'Time management',
    'Adaptability',
    'Critical thinking',
  ],
  references: [
    { name: 'Charles Jeckton', role: 'Software Developer — Craft Silicon', email: 'charlesjeckton8986@gmail.com' },
    { name: 'Paul Omoro', role: 'Headteacher — Kanyaboli School', email: 'paulomoro67@gmail.com' },
  ],
};
