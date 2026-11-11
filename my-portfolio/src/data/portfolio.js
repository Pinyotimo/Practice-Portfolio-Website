/* Single source of truth for the portfolio's content.
   Components stay presentational; editing copy happens here. */

export const SITE = {
  name: 'Stephen Oduor',
  shortName: 'Steve',
  role: 'Software Engineer',
  location: 'Nairobi, Kenya',
  email: 'steveotieno2012005@gmail.com',
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
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const HERO = {
  kicker: 'Open to internships & freelance work',
  heading: 'Hi, I’m',
  highlight: 'Steve',
  lead:
    'Software engineer and Computer Science student at The Co-operative University of Kenya, based in Nairobi. I build end-to-end products — event and farming platforms, explainable AI, FinOps tools — with clear interfaces and honest limits.',
  tools: ['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL'],
  /* Every tool from the Core tech tab, as one name each — these are the
     shapes that drop into the hero. */
  stack: [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C', 'PHP', 'HTML', 'CSS',
    'React', 'Vite', 'Tailwind CSS', 'Zustand', 'TanStack Query', 'React Router',
    'shadcn/ui', 'Radix UI', 'Base UI', 'Recharts', 'Leaflet',
    'Node.js', 'Express', 'FastAPI', 'Pydantic', 'Django', 'JWT', 'bcrypt', 'Helmet', 'Zod', 'Joi', 'Multer',
    'PostgreSQL', 'Supabase', 'MongoDB', 'SQLite', 'Oracle', 'Redis', 'Socket.IO', 'NumPy', 'Pandas', 'OpenCV',
    'Git', 'GitHub', 'GitHub Actions', 'Docker', 'Docker Compose', 'Kubernetes', 'Azure', 'pytest',
    'Ollama', 'Gemini', 'Groq', 'NVIDIA NIM', 'OpenAI SDK', 'Matplotlib', 'ReportLab', 'yfinance',
    'Africa’s Talking', 'M-Pesa',
  ],
  /* Cycled under the heading: "I build …" */
  roles: [
    'full-stack web products',
    'explainable AI tools',
    'data & automation systems',
    'infrastructure FinOps tooling',
  ],
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
    { label: 'Focus', value: 'Full-stack & AI products', icon: 'fa-solid fa-layer-group', key: 'focus' },
    { label: 'Also into', value: 'Automation & data systems', icon: 'fa-solid fa-diagram-project', key: 'alsoInto' },
    { label: 'Based in', value: 'Nairobi, Kenya', icon: 'fa-solid fa-location-dot', key: 'basedIn' },
  ],
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const SERVICES = [
  {
    id: 1,
    icon: 'fa-solid fa-code',
    title: 'Web Development',
    desc: 'Full-stack applications built on React and Node — typed, tested, and deployed rather than demoed.',
  },
  {
    id: 2,
    icon: 'fa-solid fa-crop-simple',
    title: 'UI/UX Design',
    desc: 'Interfaces designed against real constraints: readable type scales, sensible spacing, and motion that clarifies rather than decorates.',
  },
  {
    id: 3,
    icon: 'fa-solid fa-mobile-screen',
    title: 'App Design',
    desc: 'Responsive layouts that hold up from a 360px phone to a wide desktop, with accessible touch targets and clear hierarchy.',
  },
  {
    id: 4,
    icon: 'fa-solid fa-robot',
    title: 'AI Data Support',
    desc: 'Dataset preparation and labelling for model training with Roboflow, Labelbox and Label Prism — clean data, honest annotation guidelines.',
  },
  {
    id: 5,
    icon: 'fa-solid fa-shop',
    title: 'E-commerce Support',
    desc: 'Storefront setup and optimisation on Shopify and the web — product pages, checkout flows, and the plumbing behind them.',
  },
  {
    id: 6,
    icon: 'fa-solid fa-shield-halved',
    title: 'Cybersecurity Basics',
    desc: 'Security awareness, network fundamentals and beginner offensive thinking, applied to keeping shipped systems safer.',
  },
  {
    id: 7,
    icon: 'fa-solid fa-network-wired',
    title: 'IT Support & Network Design',
    desc: 'Support, troubleshooting and network design grounded in HCIA training — from IP addressing to structured cabling and small-business LANs.',
  },
  {
    id: 8,
    icon: 'fa-solid fa-lightbulb',
    title: 'Explainable AI Products',
    desc: 'Turning complex data and model outputs into trustworthy product experiences with deterministic evidence, clear explanations and audience-aware narratives.',
  },
  {
    id: 9,
    icon: 'fa-solid fa-rss',
    title: 'Personal Intelligence Briefings',
    desc: 'Scheduled data collection and reporting systems that turn technology, open-source, community and market signals into clear, actionable briefings and alerts.',
  },
  {
    id: 10,
    icon: 'fa-solid fa-server',
    title: 'Cloud Cost & Reliability Tools',
    desc: 'Recommendation-only infrastructure tools that turn usage evidence into safer, reviewable rightsizing decisions without applying changes automatically.',
  },
  {
    id: 11,
    icon: 'fa-solid fa-house',
    title: 'AI-Assisted Product Prototypes',
    desc: 'Full-stack prototypes that use vision models and human review to make operational workflows clearer, safer and easier to complete.',
  },
  {
    id: 12,
    icon: 'fa-solid fa-calendar-check',
    title: 'Event & Workflow Automation',
    desc: 'Building communication-first event workflows that connect organizers, attendees and safety teams through practical channels such as SMS, voice and dashboards.',
  },
  {
    id: 13,
    icon: 'fa-solid fa-seedling',
    title: 'Agricultural Coordination Platforms',
    desc: 'Designing data-rich tools that connect producers with buyers, storage and transport options to support better harvest decisions and reduce avoidable losses.',
  },
];

/* ------------------------------------------------------------------ */
/* Projects — `stack` drives both the cards and the stack chart      */
/* ------------------------------------------------------------------ */

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
};

const TECH_DISCIPLINE = {
  React: 'frontend',
  TypeScript: 'frontend',
  'TanStack Query': 'frontend',
  Zustand: 'frontend',
  Leaflet: 'frontend',
  HTML: 'frontend',
  CSS: 'frontend',
  'Node.js': 'backend',
  PHP: 'backend',
  Supabase: 'data',
  'Socket.IO': 'data',
  MySQL: 'data',
  Python: 'backend',
  FastAPI: 'backend',
  SQLite: 'data',
  Vite: 'frontend',
  'NVIDIA-hosted LLM API': 'data',
  'Azure Container Apps': 'backend',
  'GitHub Actions': 'backend',
  'GitHub API': 'backend',
  RSS: 'data',
  Reddit: 'data',
  yfinance: 'data',
  Matplotlib: 'data',
  ReportLab: 'backend',
  'Groq client': 'backend',
  Kubernetes: 'backend',
  Pydantic: 'backend',
  pytest: 'backend',
  PostgreSQL: 'data',
  Docker: 'backend',
  'Docker Compose': 'backend',
  "Africa's Talking API": 'backend',
  SMS: 'backend',
  'M-Pesa': 'data',
  'QR tickets': 'frontend',
  'AI assistant': 'backend',
  'MAVUNO AI': 'backend',
  'Sample data': 'data',
  Express: 'backend',
  MongoDB: 'data',
  Gemini: 'backend',
  'Africa’s Talking': 'backend',
  USSD: 'backend',
  'OpenStreetMap': 'data',
  'React Router': 'frontend',
  'shadcn/UI': 'frontend',
  'Headless UI': 'frontend',
  'Radix UI': 'frontend',
  Axios: 'frontend',
  'Supabase JS': 'data',
  'Socket.IO client': 'data',
  'QR scanning/generation': 'frontend',
  'Framer Motion': 'frontend',
  'M-Pesa Daraja': 'data',
  Ollama: 'backend',
  Llama: 'backend',
  'pdf-parse': 'backend',
  JavaScript: 'frontend',
  'PHP sessions': 'backend',
  'JSON file storage': 'data',
  'Supabase/PostgreSQL': 'data',
  'NVIDIA NIM': 'backend',
  'Ollama/Llama': 'backend',
  'JavaScript / JSX': 'frontend',
  'Tailwind CSS': 'frontend',
  'shadcn/Base UI': 'frontend',
  Recharts: 'frontend',
  'React-Leaflet': 'frontend',
  JWT: 'backend',
  bcrypt: 'backend',
  Joi: 'backend',
  Zod: 'backend',
  Multer: 'backend',
  Helmet: 'backend',
  'Rate limiting': 'backend',
  Uvicorn: 'backend',
  'OpenAI SDK': 'backend',
  NumPy: 'data',
  Pandas: 'data',
  OpenCV: 'data',
  Oracle: 'data',
  oracledb: 'data',
};

export const PROJECTS = [
  {
    id: 1,
    img: '/Images/auction-management.jpg',
    imgPosition: 'center', // a photo, not a page screenshot
    imgWidth: 6240,
    imgHeight: 4160,
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
    img: '/Images/kiliplanner-photo.jpeg',
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
    img: '/Images/eldec-photo.jpeg',
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
    img: '/Images/pharmacy-management-system.png',
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
    img: '/Images/pexels-tranmautritam-251225.jpg',
    imgPosition: 'center', // a photo, not a page screenshot
    imgWidth: 5141,
    imgHeight: 3055,
    title: 'Portfolio Website',
    desc: 'This site — built from scratch with a hand-written design system, dark mode, and a dependency-free charting layer.',
    stack: ['HTML', 'CSS'],
    href: 'https://github.com/Pinyotimo/Practice-Portfolio-Website',
    icon: 'fa-brands fa-github',
    label: 'View Portfolio Website on GitHub',
    type: 'Open source',
  },
  {
    id: 6,
    img: '/Images/pexels-tima-miroshnichenko-5380642.jpg',
    imgPosition: 'center', // a photo, not a page screenshot
    imgWidth: 3936,
    imgHeight: 2624,
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
    img: '/Images/why%20it%20happened.png',
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
    img: '/Images/Tech%20Radar.jpeg',
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
      'Groq client',
    ],
    href: null,
    icon: 'fa-solid fa-circle-info',
    label: 'TechWatch case study',
    type: 'Automation system',
  },
  {
    id: 9,
    img: '/Images/Kubernetes%20Finops%20Agent.png',
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
    img: '/Images/Movemate.png',
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
    img: '/Images/AI%20powered%20Event%20Management%20System.png',
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
      'Supabase/PostgreSQL',
      'Africa’s Talking',
      'M-Pesa Daraja',
      'Gemini',
      'NVIDIA NIM',
      'Ollama/Llama',
    ],
    href: 'https://ai-powered-event-management-system.vercel.app/',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View AI-Powered Event Management System live',
    type: 'Hackathon build',
  },
  {
    id: 12,
    img: '/Images/Mavuno%20Grid.png',
    imgWidth: 1259,
    imgHeight: 599,
    title: 'MAVUNO Green Grid',
    desc: 'A team-of-four agricultural platform prototype for CUK Innovation Week. Its repository combines a React/Vite frontend, Express API, FastAPI/Uvicorn AI service and Oracle-backed Docker Compose stack, with modules for harvest risk, buyer matching and resource allocation. The deployed frontend uses local sample data and is not connected to the Python modules or a live database.',
    stack: [
      'React',
      'JavaScript / JSX',
      'Vite',
      'Tailwind CSS',
      'shadcn/Base UI',
      'Recharts',
      'React-Leaflet',
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
    img: '/Images/Real%20Estate%20Manager.png',
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
    img: '/Images/E-Commerce%20Shop.png',
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
      'M-Pesa',
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
  const counts = { frontend: 0, backend: 0, data: 0 };
  project.stack.forEach((tech) => {
    const key = TECH_DISCIPLINE[tech];
    if (key) counts[key] += 1;
  });
  return { id: project.id, title: project.title, counts, total: counts.frontend + counts.backend + counts.data };
});

/* ------------------------------------------------------------------ */
/* Experience — the timeline chart reads the same records             */
/* ------------------------------------------------------------------ */

export const EXPERIENCE = [
  {
    id: 1,
    kind: 'award',
    icon: 'fa-solid fa-trophy',
    period: 'May 2026 – August 2026',
    start: '2026-05',
    end: '2026-08',
    role: 'Hackathon Runner-Up',
    company: 'Davis & Shirtliff',
    desc: 'Built SmartAuction B2B with React, TypeScript, TanStack Query, Zustand and Socket.IO.',
  },
  {
    id: 2,
    kind: 'award',
    icon: 'fa-solid fa-medal',
    period: 'September 2026',
    start: '2026-09',
    end: '2026-09',
    role: 'Finalist',
    company: '5th Annual Kilimani Urban Hackathon',
    desc: 'Developed KiliPlanner, a live reporting map using React, Leaflet and Supabase.',
  },
  {
    id: 3,
    kind: 'work',
    icon: 'fa-solid fa-laptop-code',
    period: 'March 2026 – Present',
    start: '2026-03',
    end: null,
    ongoing: true,
    role: 'Web Developer',
    company: 'SkillyMe Africa',
    desc: '',
  },
  {
    id: 4,
    kind: 'work',
    icon: 'fa-solid fa-pen-nib',
    period: 'Jan 2026 – March 2026',
    start: '2026-01',
    end: '2026-03',
    role: 'AI Technical Writing Intern',
    company: 'GAO TEK',
    desc: '',
  },
  {
    id: 5,
    kind: 'freelance',
    icon: 'fa-solid fa-house-laptop',
    period: 'Nov 2025 – Dec 2025',
    start: '2025-11',
    end: '2025-12',
    role: 'Freelance Developer',
    company: 'Property Hub Website',
    desc: '',
  },
];

/* `project` must match a PROJECTS title (case-insensitive) — the tab pulls
   the stack and live link from there. `result` is only for placed entries. */
export const HACKATHONS = [
  {
    id: 1,
    event: 'Davis & Shirtliff hackathon',
    project: 'SmartAuction B2B',
    result: 'Runner-up',
    desc: 'Built a live B2B auction platform with React, TypeScript, TanStack Query, Zustand and Socket.IO.',
  },
  {
    id: 2,
    event: '5th Annual Kilimani Urban Hackathon',
    project: 'KiliPlanner',
    result: 'Finalist',
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

/* ------------------------------------------------------------------ */
/* Education & certifications                                           */
/* ------------------------------------------------------------------ */

export const EDUCATION = [
  {
    kind: 'degree',
    icon: 'fa-solid fa-graduation-cap',
    label: '2024 – 2028',
    title: 'BSc Computer Science — ',
    bold: 'The Co-operative University of Kenya',
    link: null,
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-robot',
    label: 'December 2025',
    title: 'AI for Software Development Training — ',
    bold: 'Moringa School',
    area: 'Data & AI',
    link: '/Images/Moringa AI course certificate.pdf',
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-code',
    label: 'Nov 2025',
    title: 'Web Development Bootcamp — ',
    bold: 'eMobilis Technology Training Institute',
    link: null,
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-network-wired',
    label: 'Sep 2025 – Jan 2026',
    title: 'Huawei Certified ICT Associate (HCIA) — ',
    bold: 'Huawei Kenya',
    link: null,
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-shield-halved',
    label: 'Sep – Dec 2024',
    title: 'Digital Safety & Security Awareness — ',
    bold: 'Cisco Networking Academy',
    area: 'Cybersecurity',
    link: '/Images/Digital_Safety_and_Security_Awareness_certificate_steveotieno2012005-gmail-com_2726ea6b-fe42-4882-9c63-3cf4db38f68d.pdf',
  },
  {
    kind: 'training',
    icon: 'fa-solid fa-people-group',
    label: '2025',
    title: 'Aspire Leaders Program — ',
    bold: 'Aspire Institute',
    area: 'Leadership',
    link: '/Images/Aspire Institute Badge.pdf',
  },
  {
    kind: 'degree',
    icon: 'fa-solid fa-school',
    label: 'Jan 2020 – Nov 2023',
    title: '',
    bold: 'Sawagongo National School',
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

/* Ten certificates in total: the seven above plus the Moringa AI course,
   Cisco Digital Safety and the Aspire Leaders badge. */
/* Every certificate on the site — the Certifications list plus the
   education entries that come with one — counted by area. */
export const ALL_CERTIFICATES = [
  ...CERTIFICATIONS,
  ...EDUCATION.filter((item) => item.link).map((item) => ({ text: item.bold, area: item.area })),
];

export const CERT_AREAS = Object.entries(
  ALL_CERTIFICATES.reduce((acc, cert) => ({ ...acc, [cert.area]: (acc[cert.area] ?? 0) + 1 }), {}),
).map(([area, count]) => ({ area, count }));

/* ------------------------------------------------------------------ */
/* Skills & core technologies                                          */
/* ------------------------------------------------------------------ */

/* Skills tab. `group` keys into SKILL_GROUPS. `match` lists stack names;
   any project whose stack contains one counts as evidence for the skill, so
   "Used in N projects" stays true as PROJECTS changes. `cert` must match a
   CERTIFICATIONS `text`. */
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
    tools: ['React', 'Node.js & Express', 'PostgreSQL', 'Tailwind CSS'],
    match: ['React', 'Express', 'HTML'],
  },
  {
    title: 'Software Engineering',
    desc: 'Writing scalable, readable code with typed models, tests and version control.',
    icon: 'fa-solid fa-diagram-project',
    group: 'build',
    tools: ['TypeScript', 'FastAPI & Pydantic', 'pytest', 'Git & GitHub'],
    match: ['TypeScript', 'Pydantic', 'pytest'],
  },
  {
    title: 'E-commerce Tools',
    desc: 'Building and managing web stores, including local payment flows such as M-Pesa.',
    icon: 'fa-solid fa-cart-shopping',
    group: 'build',
    tools: ['Shopify', 'M-Pesa Daraja'],
    match: ['M-Pesa'],
  },
  {
    title: 'AI & LLM Integration',
    desc: 'Wiring local and hosted language models into real products, with output a person can review.',
    icon: 'fa-solid fa-wand-magic-sparkles',
    group: 'ai',
    tools: ['Ollama', 'Groq', 'Gemini', 'OpenAI SDK', 'NVIDIA NIM'],
    match: ['LLM', 'Groq', 'Gemini', 'OpenAI', 'Ollama', 'NVIDIA'],
  },
  {
    title: 'Automation & Data Pipelines',
    desc: 'Scheduled jobs that collect, rank and report data without manual steps.',
    icon: 'fa-solid fa-gears',
    group: 'ai',
    tools: ['Python', 'GitHub Actions', 'Pandas', 'Matplotlib'],
    match: ['GitHub Actions', 'Pandas', 'yfinance'],
    cert: 'Data Analytics Certificate',
  },
  {
    title: 'AI Data Annotation',
    desc: 'Labelling data to train computer vision and language models.',
    icon: 'fa-solid fa-tags',
    group: 'ai',
    tools: ['Roboflow', 'Labelbox', 'Label Prism'],
    match: [],
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Containerising and deploying services — and reasoning about what they cost to run.',
    icon: 'fa-solid fa-cloud',
    group: 'infra',
    tools: ['Docker Compose', 'Kubernetes', 'Azure Container Apps', 'GitHub Actions'],
    match: ['Docker', 'Kubernetes', 'Azure', 'GitHub Actions'],
  },
  {
    title: 'Networking',
    desc: 'Network fundamentals, connectivity, troubleshooting and secure system communication.',
    icon: 'fa-solid fa-network-wired',
    group: 'infra',
    tools: ['Connectivity', 'Troubleshooting', 'Secure communication'],
    match: [],
    cert: 'Network Technician Career Path',
  },
  {
    title: 'Cybersecurity Basics',
    desc: 'Foundational security awareness, vulnerability thinking and beginner pentesting concepts.',
    icon: 'fa-solid fa-shield-halved',
    group: 'infra',
    tools: ['Security awareness', 'Vulnerability thinking', 'Pentesting concepts'],
    match: [],
    cert: 'Commonwealth Introduction to Cybersecurity',
  },
  {
    title: 'UI/UX Design',
    desc: 'Designing intuitive web and app interfaces — layout, motion, accessibility and design systems.',
    icon: 'fa-solid fa-palette',
    group: 'craft',
    tools: ['Design systems', 'Accessibility', 'Motion', 'shadcn/ui'],
    match: ['Tailwind', 'shadcn'],
  },
  {
    title: 'Virtual Assistance',
    desc: 'Supporting digital workflows — research, scheduling, documentation and online task management.',
    icon: 'fa-solid fa-headset',
    group: 'craft',
    tools: ['Research', 'Scheduling', 'Documentation'],
    match: [],
  },
];

/* Core tech tab. `icon` (optional) is a Font Awesome class for tools that
   have a logo; everything else gets a monogram tile. The project count is
   found by matching each part of `tag` (split on & , /) against PROJECTS
   stacks — `match` overrides those names, `count: false` hides it (used
   where nearly every project applies, e.g. Git). */
export const TECH_CATEGORIES = [
  {
    heading: 'Languages',
    icon: 'fa-solid fa-code',
    items: [
      { tag: 'JavaScript / TypeScript', icon: 'fa-brands fa-js', desc: 'Type-safe modular logic and dynamic interfaces.' },
      { tag: 'Python', icon: 'fa-brands fa-python', desc: 'Automation, rapid prototyping and backend logic.' },
      { tag: 'Java', icon: 'fa-brands fa-java', desc: 'Robust cross-platform enterprise software.' },
      { tag: 'C++', desc: 'High-performance applications and object-oriented structures.' },
      { tag: 'C', desc: 'Low-level systems logic and custom memory management.' },
    ],
  },
  {
    heading: 'Frontend',
    icon: 'fa-solid fa-display',
    items: [
      { tag: 'React', icon: 'fa-brands fa-react', desc: 'Building responsive user interfaces.' },
      { tag: 'Vite', icon: 'fa-solid fa-bolt', desc: 'Fast development and production tooling for React applications.' },
      { tag: 'Zustand & TanStack Query', desc: 'State management and server-state caching.' },
      { tag: 'Tailwind CSS & Base UI', desc: 'Composable styling and interface primitives for React products.' },
      { tag: 'React Router, shadcn/UI & Radix UI', desc: 'Composable navigation and interface primitives.' },
      { tag: 'Recharts & React-Leaflet', icon: 'fa-solid fa-map-location-dot', desc: 'Charts and interactive map views for data-rich interfaces.' },
    ],
  },
  {
    heading: 'Backend & APIs',
    icon: 'fa-solid fa-server',
    items: [
      { tag: 'Node.js & Express', icon: 'fa-brands fa-node-js', desc: 'Developing server-side APIs and services.' },
      { tag: 'FastAPI', desc: 'Building typed Python APIs for data-driven products.' },
      { tag: 'Pydantic', desc: 'Validating structured analysis inputs, policies and decisions.' },
      { tag: 'Django', desc: 'Building secure, rapid full-stack architectures.' },
      { tag: 'APIs', icon: 'fa-solid fa-plug', desc: 'Designing and consuming RESTful interfaces.' },
      { tag: 'JWT, bcrypt & Helmet', icon: 'fa-solid fa-lock', desc: 'Authentication and baseline API security middleware.' },
      { tag: 'Multer, Joi & Zod', desc: 'File uploads and structured request validation.' },
      { tag: 'PHP sessions & JSON storage', icon: 'fa-brands fa-php', desc: 'Session-based authentication and file-backed employee records.' },
    ],
  },
  {
    heading: 'Data & real-time',
    icon: 'fa-solid fa-database',
    items: [
      { tag: 'PostgreSQL & Supabase', desc: 'Relational schemas and managed backend services — including property inventory, inspections and issue reports.' },
      { tag: 'MongoDB / MERN', icon: 'fa-solid fa-leaf', desc: 'NoSQL data storage and full-stack integration.' },
      { tag: 'SQLite', desc: 'Portable relational storage for focused products and repeatable demos.' },
      { tag: 'Oracle', desc: 'Relational storage used by the Mavuno repository’s Docker Compose setup.' },
      { tag: 'Redis', desc: 'In-memory data caching and message brokering.' },
      { tag: 'Socket.IO', icon: 'fa-solid fa-tower-broadcast', desc: 'Real-time bidirectional communication.' },
      { tag: 'NumPy, Pandas & OpenCV', desc: 'Data and image-processing foundations for AI service prototypes.' },
    ],
  },
  {
    heading: 'DevOps & cloud',
    icon: 'fa-solid fa-cloud',
    items: [
      { tag: 'Git & GitHub', icon: 'fa-brands fa-github', count: false, desc: 'Version control, source code management and collaborative development.' },
      { tag: 'Docker', icon: 'fa-brands fa-docker', desc: 'Containerizing applications for consistent deployment.' },
      { tag: 'Docker Compose', icon: 'fa-brands fa-docker', desc: 'Starting reproducible local backend, frontend and database stacks.' },
      { tag: 'Kubernetes', icon: 'fa-solid fa-dharmachakra', desc: 'Orchestrating containerized workloads — workload requests, policies and reviewable manifests.' },
      { tag: 'Azure Container Apps', icon: 'fa-brands fa-microsoft', desc: 'Deploying containerized APIs and frontends.' },
      { tag: 'GitHub Actions', icon: 'fa-solid fa-gears', desc: 'Scheduling repeatable collection, reporting and alert jobs.' },
      { tag: 'pytest', icon: 'fa-solid fa-vial-circle-check', desc: 'Testing deterministic safety rules and recommendation behavior.' },
    ],
  },
  {
    heading: 'AI & automation',
    icon: 'fa-solid fa-robot',
    items: [
      { tag: 'Ollama', desc: 'Running local large language models.' },
      { tag: 'Gemini, NVIDIA NIM & Ollama', desc: 'Configurable AI providers for event assistance.' },
      { tag: 'NVIDIA-hosted LLM API', desc: 'Optional narrative generation grounded in application evidence.' },
      { tag: 'Groq client', desc: 'Generating concise briefings from sourced findings.' },
      { tag: 'AI Data Annotation', icon: 'fa-solid fa-tags', desc: 'Training datasets with Roboflow, Labelbox and Label Studio.' },
      { tag: 'RSS & Reddit', icon: 'fa-solid fa-rss', desc: 'Collecting technology news and community signals.' },
      { tag: 'yfinance', icon: 'fa-solid fa-chart-line', desc: 'Reading watchlist and market data for configured thresholds.' },
      { tag: 'Matplotlib & ReportLab', icon: 'fa-solid fa-file-pdf', desc: 'Rendering visual reports and PDFs from collected data.' },
    ],
  },
  {
    heading: 'Integrations',
    icon: 'fa-solid fa-puzzle-piece',
    items: [
      { tag: 'Africa’s Talking', icon: 'fa-solid fa-comment-sms', desc: 'SMS, USSD and voice workflows for event communication and escalation.' },
      { tag: 'M-Pesa Daraja', icon: 'fa-solid fa-mobile-screen-button', match: ['M-Pesa'], desc: 'Mobile-money integrations, including attendee payments.' },
      { tag: 'QR tickets', icon: 'fa-solid fa-qrcode', desc: 'Supporting attendee check-in with scannable tickets.' },
    ],
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
  { title: 'Travelling', desc: 'Exploring new places, cultures and perspectives across Kenya and beyond.' },
  { title: 'Reading', desc: 'Technical books, biographies, and anything that sharpens the way I think.' },
  { title: 'Swimming', desc: 'The fastest way I know to stay active and clear my head.' },
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
    value: 'steveotieno2012005@gmail.com',
    href: 'mailto:steveotieno2012005@gmail.com',
  },
  { icon: 'fa-solid fa-phone', label: 'Phone', value: '+254 769 493 697', href: 'tel:+254769493697' },
  {
    icon: 'fa-brands fa-whatsapp',
    label: 'WhatsApp',
    value: '+254 750 779 480',
    href: 'https://wa.me/254750779480',
    external: true,
  },
  { icon: 'fa-solid fa-location-dot', label: 'Location', value: 'Nairobi, Kenya', href: null },
];
