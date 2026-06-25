import devconnectCover from '../assets/projects/devconnect-cover.png';
import devconnectIcon from '../assets/projects/devconnect-icon.png';
import notifyxCover from '../assets/projects/notifyx-cover.png';
import collabdocsCover from '../assets/projects/collabdocs-cover.png';
import curlixCover from '../assets/projects/curlix-cover.png';
// PLACEHOLDER IMAGE — replace src/assets/projects/paperpilot-cover.png with your real
// banner (the source repo has one at docs/screenshots/banner.png). Keep this filename
// or update the import below to match.
import paperpilotCover from '../assets/projects/paperpilot-cover.png';

export const LOCAL_PROJECTS = [
  {
    _id: 'paperpilot',
    title: 'Paper Pilot',
    type: 'WEB-APP',
    value:
      'AI-powered assessment-creation platform that lets educators generate structured, print-ready exam papers — with answer keys — in seconds.',
    description:
      'A full-stack TypeScript monorepo (pnpm workspaces) where teachers fill a guided form (subject, class, question types, marks distribution), optionally upload a source PDF/DOCX/text file, and get a sectioned question paper plus downloadable PDF. Built with Next.js 14, an Express + Socket.IO API, and a BullMQ worker sharing one Zod-based type system.',
    features: [
      'Architected a non-blocking, queue-based pipeline — the API enqueues an LLM job and responds in under 300 ms while a dedicated worker handles all LLM + PDF work',
      'Streamed real-time stage events (analyzing → building prompt → generating → parsing → saving) over Redis Pub/Sub bridged into per-assignment Socket.IO rooms for a live progress timeline',
      'Built a robust LLM pipeline calling the DeepSeek model (OpenAI SDK) with strict Zod validation and automatic refinement-prompt retries on failure',
      'Engineered defense-in-depth validation — generated content is validated before persistence and again before PDF rendering',
      'Cached PDFKit-rendered PDFs in Redis for 24h, making repeat downloads ~12× faster',
      'Shipped a bonus "AI Teacher\'s Toolkit" — standalone grading-rubric and lesson-plan tools on the same backend',
    ],
    metrics: ['Sub-300ms API response', '~12× faster cached PDFs', 'Solo full-stack build'],
    highlights: [
      'Queue-based, non-blocking API — LLM + PDF offloaded to a dedicated worker',
      'Real-time step-level progress over WebSockets instead of a black-box spinner',
      'Strict Zod schema validation with auto-retry refinement prompts',
      'pnpm monorepo with one shared Zod type system across web, API, and worker',
    ],
    highlightsLabel: 'ENGINEERING HIGHLIGHTS',
    architecture: ['Next.js Web', 'Express API', 'BullMQ Queue', 'Worker', 'DeepSeek LLM', 'Redis', 'MongoDB'],
    architectureDecisions: [
      { q: 'Why a queue-based API?', a: 'LLM generation takes seconds, not milliseconds. The API validates, persists, and enqueues a BullMQ job — then responds in under 300 ms. The browser never blocks on the model; all expensive work runs in a separate worker process.' },
      { q: 'Why stream progress over WebSockets?', a: 'A multi-second generation behind a spinner feels broken. The worker publishes each stage to Redis Pub/Sub, the API bridges it via Socket.IO into a per-assignment room, and the user watches a live step-by-step timeline — no polling.' },
      { q: 'Why validate twice?', a: 'LLM output is untrusted. Responses are validated against a strict Zod schema before persistence, and re-validated before PDF rendering — so a malformed paper can never reach the database or the printer.' },
    ],
    coverImage: paperpilotCover,
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zustand', 'Express', 'Socket.io', 'BullMQ', 'Redis', 'MongoDB', 'Mongoose', 'Zod', 'PDFKit', 'DeepSeek', 'pnpm'],
    githubLink: '<PASTE_REPO_URL>',
    liveLink: null,
    challenge: {
      accentColor: '#f59e0b',
      context: 'Generation took several seconds. Holding the HTTP request open for the LLM call timed out and froze the UI behind a spinner.',
      codeLines: [
        { t: 'comment', text: '// before: block the request on the LLM call' },
        { t: 'code',    text: 'const paper = await deepseek.generate(spec); // 5-15s' },
        { t: 'code',    text: 'res.json(paper);' },
        { t: 'spacer' },
        { t: 'comment', text: '// after: enqueue + respond instantly, stream progress' },
        { t: 'code',    text: 'await genQueue.add("generate", spec); // ~5 ms' },
        { t: 'code',    text: 'res.status(202).json({ assignmentId }); // <300 ms' },
      ],
      takeaway: 'Offloading the LLM call to a BullMQ worker plus WebSocket progress turned a frozen spinner into a live timeline.',
    },
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
    highlights: [
      'Implemented CRDT-based conflict resolution using Y.js',
      'Real-time sync via WebSockets (Socket.io)',
      'Handled concurrent edits across multiple users without data loss',
      'Optimized document sync to reduce payload size',
    ],
    highlightsLabel: 'ENGINEERING HIGHLIGHTS',
    architecture: ['Client', 'Y.js CRDT', 'Socket.IO', 'Y.Doc', 'Redis', 'MongoDB'],
    architectureDecisions: [
      { q: 'Why CRDT?', a: 'Without it, last-write-wins causes silent data loss. Y.js guarantees convergence — two users editing the same word simultaneously always merge correctly, no conflicts.' },
      { q: 'Why delta sync?', a: 'Broadcasting the full document on every keystroke is expensive. Y.js delta encoding sends only what changed — roughly 10× smaller payload at scale.' },
      { q: 'Why Redis adapter?', a: 'Socket.io rooms don\'t scale past one server instance. The Redis Pub/Sub adapter lets multiple servers share room state, so any server can handle any user.' },
    ],
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
    architectureDecisions: [
      { q: 'Why a queue?', a: 'Decouples notification creation from delivery. The API responds instantly and drops the job into BullMQ — no user waits for a slow downstream call.' },
      { q: 'Why a worker?', a: 'Handles retries, backoff, and concurrency without blocking the main thread. If delivery fails, BullMQ retries up to 5× with exponential backoff automatically.' },
      { q: 'Why a DLQ?', a: 'After 5 retries, failed jobs move to a Dead Letter Queue instead of silently disappearing. Gives full visibility into failures so nothing is ever lost.' },
    ],
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
    architectureDecisions: [
      { q: 'Why refresh tokens?', a: 'Short-lived JWTs (15 min) limit damage if stolen. Refresh tokens rotate on every use — a leaked token is detected and invalidated on the next request.' },
      { q: 'Why sequence numbers?', a: 'Socket.io parallel emits have no ordering guarantee. Sequence numbers let the client buffer and sort messages before rendering, fixing out-of-order display under load.' },
      { q: 'Why REST + WebSockets?', a: 'REST for standard CRUD — stateless and cacheable. WebSockets only for real-time chat. Using sockets for everything adds unnecessary complexity without benefit.' },
    ],
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
  {
    _id: 'curlix',
    title: 'Curlix',
    type: 'WEB-APP',
    value:
      'A production-grade URL shortener with sub-10 ms redirects, async analytics, and zero-account UX.',
    description:
      'A URL shortener built with React, Express, Redis, and Postgres. Features bearer-token ownership, Redis-cached redirects, BullMQ async analytics, and Cloudflare Turnstile bot protection.',
    features: [
      'Architected zero-account UX — each link is owned by a bearer token issued at creation, no email or password required',
      'Built sub-10 ms redirect path using Redis cache with 24-hour TTL, falling back to Postgres only on cache miss',
      'Engineered async analytics pipeline via BullMQ — click events are fire-and-forget, never blocking the redirect',
      'Implemented tiered rate limiting (create / redirect / mutate) enforced via Redis INCR + EXPIRE',
      'Shipped per-link analytics dashboard with daily breakdown, device split, and top referrers using Recharts',
    ],
    metrics: ['Sub-10ms redirects', 'Zero-account UX', 'Async analytics via BullMQ'],
    highlights: [
      'Redis-first redirect path — no DB hit on the happy path',
      'BullMQ queue decouples analytics from the redirect hot path',
      'Bearer token ownership with one-time reveal and client-side persistence',
      'Health endpoints with active Redis, Postgres, and queue probing',
    ],
    highlightsLabel: 'SYSTEM DESIGN',
    architecture: ['Client', 'Turnstile', 'Express API', 'Redis Cache', 'BullMQ', 'Postgres'],
    architectureDecisions: [
      { q: 'Why bearer tokens instead of accounts?', a: 'No signup friction. A token is issued at creation and shown once — the user copies it or loses it. Zero auth overhead, zero email infrastructure, zero session state.' },
      { q: 'Why Redis in front of Postgres?', a: 'The redirect path must be fast. Redis GET is <5 ms. Postgres is the source of truth but only touched on cache miss or by the analytics worker — never on the hot path.' },
      { q: 'Why BullMQ for analytics?', a: 'Click tracking must never slow down a redirect. BullMQ fire-and-forget enqueue adds ~1 ms. The worker drains asynchronously with 3× retry and exponential backoff.' },
    ],
    coverImage: curlixCover,
    tech: ['React', 'Vite', 'Node.js', 'Express', 'Redis', 'PostgreSQL', 'BullMQ', 'Tailwind CSS'],
    githubLink: 'https://github.com/imsumit28/Curlix',
    liveLink: 'https://curlix.vercel.app',
    challenge: {
      accentColor: '#2563eb',
      context: 'Analytics inserts were adding 40–80 ms to every redirect. Users waited for a DB write they\'d never see.',
      codeLines: [
        { t: 'comment', text: '// before: synchronous insert on every click' },
        { t: 'code',    text: 'await db.query("INSERT INTO analytics ...");' },
        { t: 'code',    text: 'res.redirect(302, longUrl);' },
        { t: 'spacer' },
        { t: 'comment', text: '// after: fire-and-forget enqueue, redirect instantly' },
        { t: 'code',    text: 'analyticsQueue.add("click", payload); // ~1 ms' },
        { t: 'code',    text: 'res.redirect(302, longUrl);' },
      ],
      takeaway: 'Decoupling analytics from the redirect cut p99 latency from ~80 ms to under 10 ms.',
    },
  },
];
