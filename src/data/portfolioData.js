export const profile = {
  name: 'Koushik G Sangappanavar',
  shortName: 'KG',
  role: 'Python Developer · Full-Stack Developer · AI Application Developer',
  intro:
    "I'm a Computer Science Engineering graduate with hands-on experience building web applications, integrating REST APIs and payment workflows, and developing AI-powered applications using Python and Django.",
  aboutSummary:
    'My experience spans Python and Django development, PostgreSQL-backed applications, REST API integration, payment workflows, chatbot development, debugging, and deployment. I enjoy working across backend systems and full-stack products while exploring practical AI integrations that make software more useful.',
  location: 'Karnataka, India',
  education: 'B.E. in Computer Science and Engineering · Karavali Institute of Technology',
  resumePath: '/resume.pdf',
  links: {
    github: 'https://github.com/Koushigs',
    linkedin: 'https://www.linkedin.com/in/koushik-g-sangappanavar-0b5b5b200/',
    email: 'koushikgs2004@gmail.com',
    emailUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=koushikgs2004@gmail.com',
  },
};

export const experiences = [
  {
    company: 'Anivale Private Limited',
    role: 'Python Developer Intern',
    dates: 'July 2026 – Present',
    accent: 'cyan',
    details: [
      'Integrated product APIs and improved chatbot product recommendations.',
      'Worked on payment workflows, verification, and payment method integrations.',
      'Improved chatbot responses, tested LLMs, optimized token usage, and deployed fixes.',
    ],
  },
  {
    company: 'Wipro 3D Addwize',
    role: 'Django Developer',
    dates: 'January 2026 – April 2026',
    accent: 'violet',
    details: [
      'Developed an internal Django-based part identification tool using PostgreSQL.',
      'Implemented indexed search and query optimizations.',
    ],
  },
  {
    company: 'MindMatrix',
    role: 'Android Developer Intern',
    dates: 'February 2026 – May 2026',
    accent: 'blue',
    details: [
      'Developed Android features using Kotlin and Jetpack Compose.',
      'Integrated Firebase and Google AI Studio.',
    ],
  },
];

export const skillGroups = [
  { label: 'Programming Languages', icon: 'code-2', items: ['Python', 'JavaScript', 'Kotlin', 'HTML', 'CSS'] },
  { label: 'Frontend Development', icon: 'layers-3', items: ['React', 'Responsive UI', 'Semantic HTML', 'CSS animations'] },
  { label: 'Backend Development', icon: 'server', items: ['Django', 'Django REST Framework', 'Node.js', 'Express.js'] },
  { label: 'Databases', icon: 'database', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'] },
  { label: 'AI & LLM Integration', icon: 'brain-circuit', items: ['Google Gemini', 'Sarvam AI', 'Groq', 'LLM API integration'] },
  { label: 'Developer Tools', icon: 'wrench', items: ['Git', 'GitHub', 'Postman', 'Swagger'] },
];

export const projects = [
  {
    name: 'Travello',
    category: 'Web Development',
    eyebrow: '01 / FULL-STACK',
    description: 'A full-stack travel booking web application with authentication, role-based access, and Django Admin.',
    details: 'Travello brings booking workflows, user roles, and responsive templates together around a Django and PostgreSQL backend.',
    tags: ['Django', 'PostgreSQL', 'Authentication', 'Role-based access'],
    tone: 'cyan',
    visual: 'web',
    github: '',
    demo: '',
  },
  {
    name: 'AI Mock Interview System',
    category: 'AI',
    eyebrow: '02 / INTELLIGENCE',
    description: 'An interview practice platform that generates questions and evaluates answers with Google Gemini.',
    details: 'The Node.js and Express.js application uses JWT authentication and bcrypt while orchestrating automated question generation and answer evaluation.',
    tags: ['Node.js', 'Express.js', 'JWT', 'Google Gemini'],
    tone: 'violet',
    visual: 'ai',
    github: '',
    demo: '',
  },
  {
    name: 'Part Identification Tool',
    category: 'Backend',
    eyebrow: '03 / SEARCH SYSTEMS',
    description: 'A Django and PostgreSQL application for fast, structured part identification.',
    details: 'Indexed search and query optimization support a focused internal workflow for finding and identifying parts.',
    tags: ['Django', 'PostgreSQL', 'Indexed search', 'Optimization'],
    tone: 'blue',
    visual: 'database',
    github: '',
    demo: '',
  },
  {
    name: 'AI Chatbot & Product Recommendations',
    category: 'AI',
    eyebrow: '04 / COMMERCE AI',
    description: 'An LLM-powered chatbot experience connecting product recommendations, upselling, and payment workflows.',
    details: 'The project explores API integrations, product recommendations, LLM testing, token-aware responses, and payment workflows.',
    tags: ['API integrations', 'Recommendations', 'LLM testing', 'Payments'],
    tone: 'orange',
    visual: 'commerce',
    github: '',
    demo: '',
  },
];
