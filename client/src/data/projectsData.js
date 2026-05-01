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
      'Built JWT auth with refresh token rotation and protected React routes',
      'Shipped low-latency chat with Socket.io for real-time conversations',
      'Designed profile and project discovery flows for faster developer-to-developer matching',
    ],
    metrics: ['3 core features shipped', 'Real-time chat < 100ms', 'Deployed on Vercel + Render'],
    coverImage: devconnectCover,
    logoImage: devconnectIcon,
    tech: ['React', 'Vite', 'Node.js', 'MongoDB', 'Socket.io'],
    githubLink: 'https://github.com/imsumit28/DevConnect',
    liveLink: 'https://devconnect2026.vercel.app/',
  },
  {
    _id: 'notifyx',
    title: 'NotifyX',
    type: 'WEB-APP',
    value:
      'Production-grade distributed notification platform with real-time delivery, offline sync, and two-layer idempotency.',
    description:
      'A real-time notification system built with Node.js, Redis, BullMQ, and Socket.io. Handles async job processing, fault tolerance, and sub-50ms delivery.',
    features: [
      'Architected BullMQ job queue with 5 retry attempts and exponential backoff',
      'Shipped Redis Pub/Sub → Socket.io pipeline for real-time delivery with offline sync',
      'Built two-layer idempotency (Redis SETNX + MongoDB unique index) to prevent duplicates',
      'Implemented sliding window rate limiting (10K req/min global, 50 req/min per user)',
      'Engineered batch notifications for repeated actions within 30s window',
    ],
    metrics: ['30-day TTL auto-archive', 'Sub-50ms latency', 'Fault-tolerant DLQ'],
    coverImage:
      'https://images.unsplash.com/photo-1553821552-896250663a55?auto=format&fit=crop&w=1200&q=80',
    tech: ['Node.js', 'Express', 'BullMQ', 'Redis', 'Socket.io', 'MongoDB', 'Mongoose'],
    githubLink: 'https://github.com/imsumit28/NotifyX',
    liveLink: null,
  },
  {
    _id: 'collabdocs',
    title: 'CollabDocs',
    type: 'WEB-APP',
    value:
      'Real-time collaborative document editor with AI writing assistance, live cursors, and CRDT-based conflict resolution.',
    description:
      'A production-ready doc editor built with Next.js, Y.js CRDT, and Socket.io. Features conflict-free sync, version history, comments, and AI-powered suggestions.',
    features: [
      'Implemented Y.js CRDT for conflict-free real-time collaboration with ~100ms latency',
      'Built custom suggestions/track-changes mode using TipTap open-source extensions',
      'Engineered debounce strategy (5s inactivity) to limit writes to ≤12 per minute',
      'Integrated Groq Llama 3.3 API for AI writing assistant (improve, grammar fix, summarize)',
      'Shipped comprehensive test suite (~60% coverage) with 45+ test cases across auth, docs, and sync',
    ],
    metrics: ['45+ test cases', '60% code coverage', 'Horizontal scalable with Redis adapter'],
    coverImage:
      'https://images.unsplash.com/photo-1484807352052-23338dd3b312?auto=format&fit=crop&w=1200&q=80',
    tech: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Socket.io', 'Y.js', 'MongoDB', 'Groq API'],
    githubLink: 'https://github.com/imsumit28/CollabDocs',
    liveLink: 'https://collabdocs2026.vercel.app/',
  },
];
