// Content data for the home-page sections, kept out of the JSX.

export const TERMINAL_LINES = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Full-stack developer · B.Tech CSE @ VIT' },
  { type: 'cmd', text: 'cat now.txt' },
  { type: 'out', text: 'Building a real-time collaborative editor on Y.js CRDTs' },
  { type: 'cmd', text: 'ls ~/projects' },
  { type: 'out', text: 'collabdocs/  curlix/  notifyx/  paperpilot/  devconnect/' },
];

export const EXPERIENCE_CONTRIBUTIONS = [
  'Shipped 5+ React.js UI components to production screens used by customers.',
  'Built and maintained 8+ Node.js REST API endpoints for core product workflows.',
  'Wrote MongoDB queries and backend integrations across product modules.',
  'Fixed production bugs escalated by QA in a 6-member Scrum team.',
];

export const EXPERIENCE_TECHNOLOGIES = ['React.js', 'Node.js', 'MongoDB', 'REST APIs', 'Git', 'Agile'];

export const BUILT_PROJECTS = [
  {
    name: 'Paper Pilot',
    href: 'https://paperpilot2026.vercel.app',
    blurb: 'AI-powered exam-paper generator with queue-based LLM pipeline',
  },
  {
    name: 'CollabDocs',
    href: 'https://collabdocs2026.vercel.app/login',
    blurb: 'CRDT-based collaborative editor with AI assistance',
  },
  {
    name: 'NotifyX',
    href: 'https://github.com/imsumit28/NotifyX',
    blurb: 'distributed notification system using Redis & BullMQ',
  },
  {
    name: 'Curlix',
    href: 'https://curlix.vercel.app',
    blurb: 'production-grade URL shortener with sub-10 ms redirects & async analytics',
  },
  {
    name: 'DevConnect',
    href: 'https://devconnect2026.vercel.app/',
    blurb: 'real-time developer network',
  },
];

export const SOCIAL_LINKS = {
  github: 'https://github.com/imsumit28',
  linkedin: 'https://www.linkedin.com/in/imsumit45/',
  x: 'https://x.com/imsumit4545',
  email: 'ersumitkumar45@gmail.com',
};
