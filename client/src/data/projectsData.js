import devconnectCover from '../assets/projects/devconnect-cover.png';
import devconnectIcon from '../assets/projects/devconnect-icon.png';
import notifyxCover from '../assets/projects/notifyx-cover.png';
import collabdocsCover from '../assets/projects/collabdocs-cover.png';

export const LOCAL_PROJECTS = [
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
    highlights: [
      'Implemented CRDT-based conflict resolution using Y.js',
      'Real-time sync via WebSockets (Socket.io)',
      'Handled concurrent edits across multiple users without data loss',
      'Optimized document sync to reduce payload size',
    ],
    highlightsLabel: 'ENGINEERING HIGHLIGHTS',
    architecture: ['Client', 'Y.js CRDT', 'Socket.IO', 'Y.Doc', 'Redis', 'MongoDB'],
    coverImage: collabdocsCover,
    tech: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Socket.io', 'Y.js', 'MongoDB', 'Groq API'],
    githubLink: 'https://github.com/imsumit28/CollabDocs',
    liveLink: 'https://collabdocs2026.vercel.app/',
    challenge: {
      accentColor: '#10b981',
      context: 'Two users edited the same paragraph — last write won, earlier edits vanished. No error, no warning.',
      codeLines: [
        { t: 'comment', text: '// before: full state broadcast, silent overwrite' },
        { t: 'code',    text: 'socket.emit("update", fullDoc);' },
        { t: 'spacer' },
        { t: 'comment', text: '// after: Y.js CRDT delta sync — always converges' },
        { t: 'code',    text: 'Y.applyUpdate(ydoc, delta);' },
        { t: 'code',    text: 'socket.to(room).emit("sync", Y.encodeStateAsUpdate(ydoc));' },
      ],
      takeaway: '40 lines replaced 2 weeks of a broken custom approach.',
    },
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
    highlights: [
      'Producer → Queue (BullMQ) → Worker → Delivery Service',
      'Redis for queueing, retries, and rate limiting',
      'Dead Letter Queue (DLQ) for failed jobs',
      'Idempotency layer to prevent duplicate notifications',
    ],
    highlightsLabel: 'SYSTEM DESIGN',
    architecture: ['Client', 'API', 'Queue', 'Worker', 'Redis', 'Delivery'],
    coverImage: notifyxCover,
    tech: ['Node.js', 'Express', 'BullMQ', 'Redis', 'Socket.io', 'MongoDB', 'Mongoose'],
    githubLink: 'https://github.com/imsumit28/NotifyX',
    liveLink: null,
    challenge: {
      accentColor: '#3b82f6',
      context: 'One comment triggered 5 notifications. BullMQ retrying with zero idempotency.',
      codeLines: [
        { t: 'comment', text: '// two-layer guard — neither alone is enough' },
        { t: 'code',    text: 'const fresh = await redis.setnx(`notif:${jobId}`, "1");' },
        { t: 'code',    text: 'if (!fresh) return; // already delivered, bail fast' },
        { t: 'spacer' },
        { t: 'code',    text: 'await Notification.create({ eventId });' },
        { t: 'comment', text: '// ↑ unique index catches Redis-restart edge case' },
      ],
      takeaway: 'Idempotency at two layers — speed in Redis, durability in Mongo.',
    },
  },
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
    metrics: ['Real-time chat <100ms', 'JWT + refresh token auth', 'Deployed on Vercel + Render'],
    highlights: [
      'Real-time messaging using WebSockets (<100ms latency)',
      'JWT-based authentication with secure session handling',
      'Scalable backend with REST + Socket architecture',
    ],
    highlightsLabel: 'FEATURE HIGHLIGHTS',
    architecture: ['Client', 'JWT Auth', 'REST API', 'Socket.IO', 'MongoDB'],
    coverImage: devconnectCover,
    logoImage: devconnectIcon,
    tech: ['React', 'Vite', 'Node.js', 'MongoDB', 'Socket.io'],
    githubLink: 'https://github.com/imsumit28/DevConnect',
    liveLink: 'https://devconnect2026.vercel.app/',
    challenge: {
      accentColor: '#8b5cf6',
      context: "Messages appeared out of order under load. Spent a full day chasing a React bug that didn't exist.",
      codeLines: [
        { t: 'comment', text: '// server: tag every emission with a sequence number' },
        { t: 'code',    text: 'io.to(room).emit("msg", { ...data, seq: ++counter });' },
        { t: 'spacer' },
        { t: 'comment', text: '// client: buffer and sort before rendering' },
        { t: 'code',    text: 'buf.push(msg); buf.sort((a, b) => a.seq - b.seq);' },
      ],
      takeaway: 'Socket.io parallel emits have no ordering guarantee. Sequence numbers fixed it.',
    },
  },
];
