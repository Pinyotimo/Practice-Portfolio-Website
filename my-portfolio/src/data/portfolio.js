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
    'Software engineer and Computer Science undergraduate in Nairobi. I build full-stack web applications with React, Node, Postgres and real-time systems — and I am looking for an internship or freelance work.',
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
    'I’m a software engineer and Computer Science undergraduate at The Co-operative University of Kenya, based in Nairobi. I’ve shipped production work — a B2B auction platform for Davis & Shirtliff, an anonymous civic-reporting map for Kilimani Ward, and storefronts and dashboards for real clients. I work across React, Node, Postgres and real-time systems, and I pick up unfamiliar codebases fast.',
  tools: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.IO'],
};

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const ABOUT = {
  kicker: 'Who I am',
  title: 'About me',
  lead:
    'A short version: I build things end to end, I care about how they feel to use, and I document as I go.',
  body:
    'I build responsive, well-structured applications and care about the details that make them feel considered — layout, motion, accessibility, and the code underneath. My work leans full-stack, with a growing focus on AI-assisted development and real-time systems. When I’m not shipping, I’m usually deepening a skill: networking, security fundamentals, or the data work behind modern ML pipelines.',
  highlights: [
    { label: 'Focus', value: 'Full-stack engineering' },
    { label: 'Also into', value: 'Real-time & data systems' },
    { label: 'Based in', value: 'Nairobi, Kenya' },
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
};

export const PROJECTS = [
  {
    id: 1,
    img: '/Images/auction-management.jpg',
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
    desc: 'A live, anonymous map for reporting infrastructure and environmental issues across Kilimani Ward, Nairobi. Finalist at the 5th Annual Kilimani Urban Hackathon.',
    stack: ['React', 'Leaflet', 'Supabase'],
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
    imgWidth: 3936,
    imgHeight: 2624,
    title: 'Modern HR Management System',
    desc: 'An HR solution covering employee records, attendance tracking and performance evaluation for small teams.',
    stack: ['PHP', 'MySQL'],
    href: 'https://oduor.wuaze.com/index.php',
    icon: 'fa-solid fa-arrow-up-right-from-square',
    label: 'View HR Management System live',
    type: 'Client work',
  },
];

/* Per-project technology counts, split by discipline — feeds the stacked bar. */
export const PROJECT_STACK_ROWS = PROJECTS.map((project) => {
  const counts = { frontend: 0, backend: 0, data: 0 };
  project.stack.forEach((tech) => {
    const key = TECH_DISCIPLINE[tech];
    if (key) counts[key] += 1;
  });
  return { id: project.id, title: project.title, counts, total: project.stack.length };
});

/* ------------------------------------------------------------------ */
/* Experience — the timeline chart reads the same records             */
/* ------------------------------------------------------------------ */

export const EXPERIENCE = [
  {
    id: 1,
    period: 'May 2026 – August 2026',
    start: '2026-05',
    end: '2026-08',
    role: 'Hackathon Runner-Up',
    company: 'Davis & Shirtliff',
    desc: 'Built SmartAuction B2B with React, TypeScript, TanStack Query, Zustand and Socket.IO.',
  },
  {
    id: 2,
    period: 'September 2026',
    start: '2026-09',
    end: '2026-09',
    role: 'Finalist',
    company: '5th Annual Kilimani Urban Hackathon',
    desc: 'Developed KiliPlanner, a live reporting map using React, Leaflet and Supabase.',
  },
  {
    id: 3,
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
    period: 'Jan 2026 – March 2026',
    start: '2026-01',
    end: '2026-03',
    role: 'AI Technical Writing Intern',
    company: 'GAO TEK',
    desc: '',
  },
  {
    id: 5,
    period: 'Nov 2025 – Dec 2025',
    start: '2025-11',
    end: '2025-12',
    role: 'Freelance Developer',
    company: 'Property Hub Website',
    desc: '',
  },
];

/* ------------------------------------------------------------------ */
/* Education & certifications                                           */
/* ------------------------------------------------------------------ */

export const EDUCATION = [
  {
    label: '2024 – 2028',
    title: 'BSc Computer Science — ',
    bold: 'The Co-operative University of Kenya',
    link: null,
  },
  {
    label: 'December 2025',
    title: 'AI for Software Development Training — ',
    bold: 'Moringa School',
    link: '/Images/Moringa AI course certificate.pdf',
  },
  {
    label: 'Nov 2025',
    title: 'Web Development Bootcamp — ',
    bold: 'eMobilis Technology Training Institute',
    link: null,
  },
  {
    label: 'Sep 2025 – Jan 2026',
    title: 'Huawei Certified ICT Associate (HCIA) — ',
    bold: 'Huawei Kenya',
    link: null,
  },
  {
    label: 'Sep – Dec 2024',
    title: 'Digital Safety & Security Awareness — ',
    bold: 'Cisco Networking Academy',
    link: '/Images/Digital_Safety_and_Security_Awareness_certificate_steveotieno2012005-gmail-com_2726ea6b-fe42-4882-9c63-3cf4db38f68d.pdf',
  },
  {
    label: '2025',
    title: 'Aspire Leaders Program — ',
    bold: 'Aspire Institute',
    link: '/Images/Aspire Institute Badge.pdf',
  },
  {
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
];

/* Nine certificates in total: the six above plus the Moringa AI course,
   Cisco Digital Safety and the Aspire Leaders badge. */
export const CERT_AREAS = [
  { area: 'Digital skills', count: 3 },
  { area: 'Cybersecurity', count: 2 },
  { area: 'Data & AI', count: 2 },
  { area: 'Networking', count: 1 },
  { area: 'Leadership', count: 1 },
];

/* ------------------------------------------------------------------ */
/* Skills & core technologies                                          */
/* ------------------------------------------------------------------ */

export const SKILLS = [
  { title: 'UI/UX Design', desc: 'Designing intuitive web and app interfaces' },
  { title: 'Web Development', desc: 'Building responsive web applications' },
  { title: 'Software Engineering', desc: 'Writing scalable, readable code' },
  {
    title: 'Virtual Assistance',
    desc: 'Supporting digital workflows — research, scheduling, documentation and online task management',
  },
  {
    title: 'AI Data Annotation',
    desc: 'Training computer vision and language models with Roboflow, Labelbox and Label Prism',
  },
  { title: 'E-commerce Tools', desc: 'Building and managing web stores with tools such as Shopify' },
  {
    title: 'Networking',
    desc: 'Network fundamentals, connectivity, troubleshooting and secure system communication',
  },
  {
    title: 'Cybersecurity Basics',
    desc: 'Foundational security awareness, vulnerability thinking and beginner pentesting concepts',
  },
];

export const TECH_CATEGORIES = [
  {
    heading: 'Programming languages',
    items: [
      { tag: 'C', desc: 'Low-level systems logic and custom memory management.' },
      { tag: 'C++', desc: 'High-performance applications and object-oriented structures.' },
      { tag: 'Java', desc: 'Robust cross-platform enterprise software.' },
      { tag: 'Python', desc: 'Automation, rapid prototyping and backend logic.' },
      { tag: 'JavaScript / TypeScript', desc: 'Type-safe modular logic and dynamic interfaces.' },
    ],
  },
  {
    heading: 'Frontend, backend & frameworks',
    items: [
      { tag: 'React', desc: 'Building responsive user interfaces.' },
      { tag: 'Node.js & Express', desc: 'Developing server-side APIs and services.' },
      { tag: 'Django', desc: 'Building secure, rapid full-stack architectures.' },
      { tag: 'APIs', desc: 'Designing and consuming RESTful interfaces.' },
      { tag: 'Zustand & TanStack Query', desc: 'State management and server-state caching.' },
    ],
  },
  {
    heading: 'Databases, caching & real-time',
    items: [
      { tag: 'MongoDB / MERN', desc: 'NoSQL data storage and full-stack integration.' },
      { tag: 'PostgreSQL & Supabase', desc: 'Relational schemas and real-time backend services.' },
      { tag: 'Redis', desc: 'In-memory data caching and message brokering.' },
      { tag: 'Socket.IO', desc: 'Real-time bidirectional communication.' },
    ],
  },
  {
    heading: 'DevOps, AI & tools',
    items: [
      { tag: 'Git & GitHub', desc: 'Version control, source code management and collaborative development.' },
      { tag: 'Docker', desc: 'Containerizing applications for consistent deployment.' },
      { tag: 'Kubernetes', desc: 'Orchestrating containerized workloads.' },
      { tag: 'Ollama', desc: 'Running local large language models.' },
      { tag: 'AI Data Annotation', desc: 'Training datasets with Roboflow, Labelbox and Label Studio.' },
    ],
  },
];

/* Self-assessed proficiency, 1–5. Labelled as self-assessed on the chart so
   it is never mistaken for a measured or certified result. */
export const PROFICIENCY = [
  {
    heading: 'Frontend & UI',
    items: [
      { tag: 'React', level: 5 },
      { tag: 'HTML & CSS', level: 5 },
      { tag: 'JavaScript & TypeScript', level: 4 },
      { tag: 'UI/UX & interface design', level: 4 },
    ],
  },
  {
    heading: 'Backend & data',
    items: [
      { tag: 'Node.js & Express', level: 4 },
      { tag: 'REST API design', level: 4 },
      { tag: 'PostgreSQL & Supabase', level: 4 },
      { tag: 'MongoDB', level: 3 },
    ],
  },
  {
    heading: 'DevOps & AI',
    items: [
      { tag: 'Git & GitHub', level: 4 },
      { tag: 'Docker', level: 3 },
      { tag: 'AI data annotation', level: 4 },
      { tag: 'Ollama & local models', level: 3 },
    ],
  },
  {
    heading: 'Networking & security',
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
