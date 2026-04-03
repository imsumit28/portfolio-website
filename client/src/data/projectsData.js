import devconnectCover from '../assets/projects/devconnect-cover.png';
import devconnectIcon from '../assets/projects/devconnect-icon.png';

export const LOCAL_PROJECTS = [
  {
    _id: 'devconnect',
    title: 'DevConnect',
    type: 'WEB-APP',
    value:
      'Designed and shipped a real-time developer network that improves collaboration through secure accounts, instant messaging, and profile-based discovery.',
    description:
      'A full-stack developer platform to connect, collaborate, and showcase projects in real time.',
    features: [
      'Implemented secure auth flows with protected routes and session-safe access control',
      'Delivered low-latency chat with Socket.io for real-time conversations',
      'Built profile and project discovery flows for faster developer-to-developer matching',
    ],
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
      'Automated resume diagnostics with targeted, section-level suggestions',
      'Flagged weak wording and structure issues to improve recruiter readability',
      'Generated ATS-focused guidance for keyword fit and formatting quality',
    ],
    coverImage:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AI API'],
    githubLink: '',
    liveLink: '',
  },
];
