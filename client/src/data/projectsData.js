import devconnectCover from '../assets/projects/devconnect-cover.png';
import devconnectIcon from '../assets/projects/devconnect-icon.png';

export const LOCAL_PROJECTS = [
  {
    _id: 'devconnect',
    title: 'DevConnect',
    type: 'WEB-APP',
    value:
      'A full-stack developer network with real-time chat, JWT auth, and profile-based developer discovery.',
    description:
      'A full-stack developer platform to connect, collaborate, and showcase projects in real time.',
    features: [
      'Implemented secure auth flows with protected routes and session-safe access control',
      'Shipped low-latency chat with Socket.io for real-time conversations',
      'Designed profile and project discovery flows for faster developer-to-developer matching',
    ],
    metrics: ['3 core features shipped', 'Real-time chat < 100ms', 'Deployed on Vercel + Render'],
    learned: 'WebSocket architecture, JWT refresh tokens',
    coverImage: devconnectCover,
    logoImage: devconnectIcon,
    tech: ['React', 'Vite', 'Node.js', 'MongoDB', 'Socket.io'],
    githubLink: 'https://github.com/imsumit28/DevConnect',
    liveLink: 'https://devconnect2026.vercel.app/',
  },
  {
    _id: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    type: 'WEB-APP',
    value:
      'Built an AI-powered resume evaluation tool that helps users produce clearer, stronger, ATS-ready resumes faster.',
    description:
      'An AI-based tool that analyzes resume quality and provides actionable suggestions to improve impact.',
    features: [
      'Built automated resume diagnostics with targeted, section-level suggestions',
      'Optimized recruiter readability by flagging weak wording and structure issues',
      'Integrated ATS-focused guidance for keyword fit and formatting quality',
    ],
    metrics: ['2 AI analysis modes', 'ATS scoring system', 'Gemini powered'],
    learned: 'LLM Prompt Engineering, API Rate Limiting',
    coverImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini API'],
    githubLink: 'https://github.com/imsumit28/AI-Resume-Analyzer',
    liveLink: 'https://ai-resume-analyzer-2026.vercel.app/',
  },
];
