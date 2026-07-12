// Skill icons are bundled locally (src/assets/icons) so the section
// doesn't depend on third-party CDNs at runtime.
import reactIcon from '../assets/icons/react.svg';
import javascriptIcon from '../assets/icons/javascript.svg';
import typescriptIcon from '../assets/icons/typescript.svg';
import nodejsIcon from '../assets/icons/nodejs.svg';
import nextjsIcon from '../assets/icons/nextjs.svg';
import expressIcon from '../assets/icons/express.svg';
import mongodbIcon from '../assets/icons/mongodb.svg';
import html5Icon from '../assets/icons/html5.svg';
import css3Icon from '../assets/icons/css3.svg';
import tailwindIcon from '../assets/icons/tailwindcss.svg';
import fastapiIcon from '../assets/icons/fastapi.svg';
import shieldLockIcon from '../assets/icons/shield-lock.svg';
import githubIcon from '../assets/icons/github.svg';
import vscodeIcon from '../assets/icons/vscode.svg';
import vercelIcon from '../assets/icons/vercel.svg';
import renderIcon from '../assets/icons/render.svg';
import socketioIcon from '../assets/icons/socketio.svg';
import redisIcon from '../assets/icons/redis.svg';
import bullmqIcon from '../assets/icons/bullmq.svg';

export const SKILL_CATEGORIES = [
  {
    category: 'CORE STACK',
    skills: [
      { name: 'React', img: reactIcon },
      { name: 'JavaScript', img: javascriptIcon },
      { name: 'TypeScript', img: typescriptIcon },
      { name: 'Node.js', img: nodejsIcon },
      { name: 'Next.js', img: nextjsIcon, invert: true },
      { name: 'Express.js', img: expressIcon, invert: true },
      { name: 'MongoDB', img: mongodbIcon },
    ],
  },
  {
    category: 'UI & STYLING',
    skills: [
      { name: 'HTML5', img: html5Icon },
      { name: 'CSS3', img: css3Icon },
      { name: 'Tailwind CSS', img: tailwindIcon },
    ],
  },
  {
    category: 'AUTH & APIs',
    skills: [
      { name: 'REST APIs', img: fastapiIcon },
      { name: 'JWT Auth', img: shieldLockIcon, invert: true },
    ],
  },
  {
    category: 'Tools & Deployment',
    skills: [
      { name: 'Git & GitHub', img: githubIcon, invert: true },
      { name: 'VS Code', img: vscodeIcon },
      { name: 'Vercel', img: vercelIcon, invert: true },
      { name: 'Render', img: renderIcon, invert: true },
    ],
  },
  {
    category: 'REAL-TIME & QUEUES',
    skills: [
      { name: 'Socket.io', img: socketioIcon, invert: true },
      { name: 'Redis', img: redisIcon },
      { name: 'BullMQ', img: bullmqIcon, invert: true },
    ],
  },
];
