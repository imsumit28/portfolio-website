export const blogPosts = [
  {
    slug: 'fault-tolerant-notification-system-bullmq',
    title: 'How I Built a Fault-Tolerant Notification System with BullMQ',
    excerpt:
      "A production-focused breakdown of idempotency, retries, batching, and real-time delivery in the NotifyX notification pipeline.",
    project: 'NotifyX',
    readTime: '8 min read',
    publishedAt: '2026-07-09',
    sourcePath: 'blog-posts/02-distributed-notifications-notifyx.md',
    intro: [
      "Most tutorials show you how to send a notification. Nobody shows you what happens when the network drops mid-delivery, your queue worker crashes, or a bug causes the same event to fire three times.",
      "This post explains how NotifyX handles those production failures with queues, persistent storage, and delivery safeguards.",
    ],
    sections: [
      {
        heading: 'Why Notifications Are Harder Than They Look',
        paragraphs: [
          'A notification system sounds simple at first: user action, enqueue a job, deliver the event. In production, retries, restarts, concurrency, and noisy traffic quickly make that model fragile.',
        ],
        bullets: [
          'A failed delivery needs retries without sending the same notification twice.',
          'Queue or worker restarts should not lose in-flight jobs.',
          "Burst traffic should not flood a user's feed with repetitive events.",
          'A single bad job should not bring down the worker process.',
        ],
      },
      {
        heading: 'The Architecture',
        paragraphs: [
          'NotifyX uses a queue-driven pipeline where the API enqueues delivery work, BullMQ workers process it, Redis Pub/Sub fans it out in real time, and MongoDB persists notification history and read state.',
        ],
        code: `Client Action -> API -> BullMQ Queue -> Worker -> Redis Pub/Sub -> Socket.io -> Client
                                      |
                                      v
                                MongoDB Persist
                                      |
                                      v
                              Dead Letter Queue`,
        bullets: [
          'BullMQ provides durable jobs, retries, and scheduling.',
          'Redis Pub/Sub decouples worker execution from live socket delivery.',
          'MongoDB stores notification history and read state.',
        ],
      },
      {
        heading: 'The Idempotency Problem',
        paragraphs: [
          'The hardest bug class was duplicate delivery after retries. A worker can begin processing, hit a transient failure, and then re-run the same logical event.',
          'To prevent duplicates across retries and restarts, the design uses a fast Redis guard plus a persistent MongoDB uniqueness check.',
        ],
        code: `const idempotencyKey = \`notif:delivered:\${jobId}\`;

// SET NX EX in one command — atomic claim + TTL. A separate
// setnx + expire pair leaks a permanent key if the process
// dies between the two calls.
const claimed = await redis.set(idempotencyKey, '1', 'NX', 'EX', 86400);

if (!claimed) return;

notificationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

try {
  await Notification.create({ userId, eventId, ...data });
} catch (err) {
  if (err.code === 11000) return;
  throw err;
}`,
        bullets: [
          'A single `SET key value NX EX ttl` atomically claims delivery *and* sets the expiry — no gap where a crash could leave a key without a TTL.',
          'MongoDB unique indexes remain the fallback when Redis state is lost.',
          'Together they protect against duplicate sends caused by retries, races, and restarts.',
        ],
      },
      {
        heading: 'Retry Logic with Exponential Backoff',
        paragraphs: [
          'Transient failures should not permanently lose notifications. BullMQ retries jobs with exponential backoff so short-lived outages can recover automatically.',
        ],
        code: `notificationQueue.add('deliver', payload, {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 1000,
  },
});`,
        paragraphsAfterCode: [
          'After the final failed attempt, the job is moved to a dead-letter queue for manual inspection and replay instead of being silently dropped.',
        ],
      },
      {
        heading: 'Rate Limiting',
        paragraphs: [
          'The system also protects itself from traffic spikes by tracking request volume in Redis sorted sets and enforcing sliding-window limits globally and per user.',
        ],
        code: `async function checkRateLimit(userId) {
  const globalKey = 'ratelimit:global';
  const userKey = \`ratelimit:user:\${userId}\`;
  const now = Date.now();
  const windowMs = 60 * 1000;

  const pipeline = redis.pipeline();
  pipeline.zremrangebyscore(globalKey, 0, now - windowMs);
  pipeline.zadd(globalKey, now, \`\${now}-\${Math.random()}\`);
  pipeline.zcard(globalKey);
  pipeline.expire(globalKey, 60);

  return pipeline.exec();
}`,
        paragraphsAfterCode: [
          'Sorted sets make the rate limit precise over a moving time window instead of resetting in bulk every minute.',
        ],
      },
      {
        heading: 'Batch Notifications',
        paragraphs: [
          "Repeated actions in a short window should feel like one grouped update, not a flood of alerts. NotifyX batches similar events for 30 seconds before delivering a single summary notification.",
        ],
        code: `const batchKey = \`batch:\${userId}:\${eventType}\`;
const existing = await redis.get(batchKey);

if (existing) {
  const batch = JSON.parse(existing);
  batch.count += 1;
  batch.latestActor = actorId;
  await redis.setex(batchKey, 30, JSON.stringify(batch));
} else {
  await redis.setex(batchKey, 30, JSON.stringify({ count: 1, actorId }));
  await notificationQueue.add('deliver', payload, { delay: 30000 });
}`,
        paragraphsAfterCode: [
          'When the delayed job runs, it reads the final batch state and emits one concise notification instead of many repetitive ones.',
        ],
      },
      {
        heading: 'Real-time Delivery via Socket.io and Redis Pub/Sub',
        paragraphs: [
          'Online users should receive updates instantly, so workers publish delivery events to Redis channels and Socket.io servers forward those events to connected clients.',
        ],
        code: `await redis.publish(\`user:\${userId}:notifications\`, JSON.stringify(notification));

const sub = redis.duplicate();
sub.subscribe(\`user:\${userId}:notifications\`);
sub.on('message', (channel, data) => {
  io.to(\`user:\${userId}\`).emit('notification', JSON.parse(data));
});`,
        paragraphsAfterCode: [
          'This keeps workers independent from socket servers and scales cleanly across multiple server instances.',
        ],
      },
      {
        heading: "What I'd Do Differently",
        bullets: [
          "Add circuit breakers so a MongoDB outage doesn't let the queue grow without bounds.",
          'Track queue depth, dead-letter volume, and delivery latency in a metrics dashboard.',
          'Introduce priority queues for urgent alerts such as security notifications.',
        ],
      },
    ],
    closingNote:
      'The source article lives in the top-level blog-posts folder and is now exposed through the portfolio site as a browsable blog entry.',
    sourceUrl: 'https://github.com/imsumit28/NotifyX',
  },
  {
    slug: 'crdt-vs-operational-transform-collabdocs',
    title: 'CRDT vs Operational Transform: What I Learned Building CollabDocs',
    excerpt:
      'Why collaborative editing breaks naive sync, and how Y.js CRDT solved concurrent editing without silent data loss.',
    project: 'CollabDocs',
    readTime: '6 min read',
    publishedAt: '2026-07-09',
    sourcePath: 'blog-posts/01-crdt-vs-ot-collabdocs.md',
    intro: [
      'When I started building CollabDocs, I thought collaborative editing just meant syncing text over WebSockets.',
      'The real challenge appeared when two users edited the same content at the same time and the naive approach started overwriting work.',
    ],
    sections: [
      {
        heading: 'The Problem',
        paragraphs: [
          'The first implementation broadcast the full document on every change. That worked for one user but failed under concurrent edits, where the last arriving update silently overwrote the other one.',
          'A timestamp-based last-write-wins patch only made the problem worse because fast typists consistently beat slower ones.',
        ],
      },
      {
        heading: 'OT vs CRDT: The Actual Tradeoff',
        paragraphs: [
          'Operational Transform preserves user intent by transforming concurrent operations against each other, but the logic becomes extremely complex once rich text, undo, and nested structures enter the picture.',
          'CRDTs solve the same class of problem differently: the data structure itself is designed so concurrent changes always merge into one valid state regardless of arrival order.',
          'For a solo project, CRDT was the practical choice because I could rely on Y.js instead of maintaining custom transformation logic.',
        ],
      },
      {
        heading: 'What I Actually Built',
        paragraphs: [
          'CollabDocs uses a local `Y.Doc` on each client. Changes are encoded as deltas, sent over Socket.io, applied on the server, and broadcast to the rest of the room.',
        ],
        code: `socket.on('doc-update', (update) => {
  Y.applyUpdate(ydoc, update);
  socket.to(roomId).emit('doc-update', update);
});

ydoc.on('update', (update, origin) => {
  if (origin !== 'remote') {
    socket.emit('doc-update', update);
  }
});`,
        paragraphsAfterCode: [
          'The `origin` check prevents echo loops so only locally produced updates are sent back to the server.',
        ],
      },
      {
        heading: 'The Debounce Strategy',
        paragraphs: [
          'Real-time collaboration should feel instant, but persisting every keystroke is expensive. Y.js emits updates constantly, so persistence is debounced while live sync remains in memory.',
        ],
        code: `let saveTimeout;

ydoc.on('update', (update) => {
  socket.to(roomId).emit('doc-update', update);

  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    saveToDatabase(roomId, Y.encodeStateAsUpdate(ydoc));
  }, 5000);
});`,
        paragraphsAfterCode: [
          'This limits database writes while preserving instant collaborative feedback for active users.',
        ],
      },
      {
        heading: 'The Test',
        paragraphs: [
          'The core proof is convergence: two offline clients can edit independently, merge later, and still reach the same final state without data loss.',
        ],
        code: `const doc1 = new Y.Doc();
const doc2 = new Y.Doc();

doc1.getText('content').insert(0, 'Hello');
doc2.getText('content').insert(0, 'World ');

Y.applyUpdate(doc1, Y.encodeStateAsUpdate(doc2));
Y.applyUpdate(doc2, Y.encodeStateAsUpdate(doc1));`,
        paragraphsAfterCode: [
          'That is the property the naive full-state approach never guaranteed.',
        ],
      },
      {
        heading: "What I'd Tell Someone Starting This",
        bullets: [
          "Don't roll your own conflict resolution when mature CRDT libraries already exist.",
          'Understand state vectors and offline sync early.',
          'Test with concurrent clients from day one, not sequential single-tab flows.',
          'Treat Redis as the sync layer and MongoDB as the persistence layer.',
        ],
      },
    ],
    closingNote:
      'This post comes from the CollabDocs markdown article in the portfolio workspace and now appears as part of the live site blog.',
    sourceUrl: 'https://github.com/imsumit28/CollabDocs',
  },
  {
    slug: 'shipping-real-time-apps-production-lessons',
    title: 'What Shipping Real-Time Apps Taught Me About Production',
    excerpt:
      'A practical write-up of the production bugs behind DevConnect: reconnects, CORS, token expiry, env drift, and message ordering.',
    project: 'DevConnect',
    readTime: '7 min read',
    publishedAt: '2026-07-09',
    sourcePath: 'blog-posts/03-deploying-to-production.md',
    intro: [
      'DevConnect worked great on localhost, then deployment exposed the real engineering work: sleeping servers, reconnect logic, CORS, token expiry, and broken assumptions about message delivery.',
      'This post distills the production lessons that only showed up after the app hit real infrastructure.',
    ],
    sections: [
      {
        heading: 'What Broke First: Socket.io in Production',
        paragraphs: [
          'On free-tier infrastructure, the backend could sleep and force every client to reconnect cold. Room membership stored in memory disappeared with each restart.',
        ],
        code: `const socket = io(SERVER_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

socket.on('reconnect', () => {
  socket.emit('rejoin-rooms', { userId: currentUser.id });
});`,
        paragraphsAfterCode: [
          'The server-side fix was to keep room membership in Redis so reconnects could rebuild socket state after restarts.',
        ],
      },
      {
        heading: 'The CORS Nightmare',
        paragraphs: [
          'Splitting frontend and backend across different domains turned CORS into a real security decision instead of a local annoyance.',
        ],
        code: `const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(\`CORS blocked: \${origin}\`));
    }
  },
  credentials: true,
}));`,
      },
      {
        heading: 'JWT Token Expiry in the Real World',
        paragraphs: [
          'Short-lived access tokens are correct, but without refresh token rotation they degrade into random user logouts and silent failures.',
        ],
        code: `async function refreshTokens() {
  const res = await fetch('/api/auth/refresh', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    logout();
    return null;
  }

  const { accessToken } = await res.json();
  return accessToken;
}`,
      },
      {
        heading: 'Chat Events Arriving Out of Order',
        paragraphs: [
          "Concurrent emits do not always arrive in the order you mentally expect. DevConnect fixed that by tagging each message with a sequence number and sorting on the client before rendering.",
        ],
        code: `io.to(roomId).emit('chat:message', {
  ...message,
  seq: ++sequence,
});

messageBuffer.push(msg);
messageBuffer.sort((a, b) => a.seq - b.seq);`,
      },
      {
        heading: 'Environment Variables: The Gap Between Dev and Prod',
        paragraphs: [
          'Configuration drift caused failures that were invisible until deploy time, so the app moved to startup validation instead of hoping every environment variable existed.',
        ],
        code: `const REQUIRED_ENV = [
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'REDIS_URL',
  'CLIENT_URL',
];

function validateEnv() {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) process.exit(1);
}`,
      },
      {
        heading: 'What Production Actually Taught Me',
        bullets: [
          'Localhost hides latency, crashes, and state loss.',
          'Error handling and structured logs are not optional.',
          'Real-time apps need state outside process memory.',
          'Free-tier infrastructure constraints should shape the design up front.',
        ],
      },
    ],
    closingNote:
      'This entry adapts the DevConnect production lessons post from the workspace blog files into the portfolio blog section.',
    sourceUrl: 'https://github.com/imsumit28/DevConnect',
  },
  {
    slug: 'how-i-made-curlix-redirects-fast',
    title: 'How I Made Curlix Redirects Fast Without Losing Analytics',
    excerpt:
      'The core tradeoff behind Curlix: keep redirects sub-10 ms while still collecting useful click analytics asynchronously.',
    project: 'Curlix',
    readTime: '5 min read',
    publishedAt: '2026-07-09',
    sourcePath: 'derived from portfolio project data',
    intro: [
      'URL shorteners look simple until you realize the redirect path is the product. Every extra database call shows up directly in user latency.',
      'Curlix was designed so analytics and ownership features exist, but never slow the hot path.',
    ],
    sections: [
      {
        heading: 'The Redirect Path Has to Stay Boring',
        paragraphs: [
          'The happy-path redirect should do almost nothing: resolve the short code, return the long URL, and redirect. That is why Curlix keeps Redis in front of Postgres.',
        ],
        bullets: [
          'Redis handles the common-case lookup in a few milliseconds.',
          'Postgres remains the source of truth on cache miss and for background processing.',
          'The user never waits for analytics writes on the redirect request.',
        ],
      },
      {
        heading: 'Why Analytics Moved Off the Request',
        paragraphs: [
          'A synchronous insert on every click was adding tens of milliseconds to each redirect. That cost was visible to every user but valuable to no user in the moment.',
        ],
        code: `// before
await db.query('INSERT INTO analytics ...');
res.redirect(302, longUrl);

// after
analyticsQueue.add('click', payload);
res.redirect(302, longUrl);`,
        paragraphsAfterCode: [
          'Moving analytics into BullMQ made click tracking fire-and-forget, which cut the redirect hot path down to the cache lookup and the HTTP redirect itself.',
        ],
      },
      {
        heading: 'Zero-Account Ownership',
        paragraphs: [
          'Curlix also avoided signup friction by issuing a bearer token when a link is created. That keeps the product fast to use while still giving the creator control over future edits.',
        ],
      },
      {
        heading: 'The Useful Tradeoff',
        bullets: [
          'Fast redirects matter more than immediate analytics durability.',
          'Background workers are the right place for non-user-visible work.',
          'Caching only helps when the database is kept off the hot path by design.',
        ],
      },
    ],
    closingNote:
      'This portfolio blog entry was derived from the Curlix project architecture and challenge notes already present in the site.',
    sourceUrl: 'https://github.com/imsumit28/Curlix',
  },
  {
    slug: 'paperpilot-queueing-llm-work',
    title: 'Why I Queued the LLM Work in Paper Pilot',
    excerpt:
      'Paper generation takes seconds, not milliseconds, so Paper Pilot pushes LLM and PDF work into a background worker and streams progress to the user.',
    project: 'Paper Pilot',
    readTime: '6 min read',
    publishedAt: '2026-07-09',
    sourcePath: 'derived from portfolio project data',
    intro: [
      'If an educator clicks generate and the browser just freezes behind a spinner, the system feels broken even when the backend is technically working.',
      'Paper Pilot solves that by separating request handling from long-running LLM and PDF generation work.',
    ],
    sections: [
      {
        heading: 'The Original Problem',
        paragraphs: [
          'Holding the HTTP request open for a multi-second LLM call made the UI feel frozen and pushed the API toward timeouts.',
        ],
        code: `// before
const paper = await deepseek.generate(spec);
res.json(paper);

// after
await genQueue.add('generate', spec);
res.status(202).json({ assignmentId });`,
      },
      {
        heading: 'Why a Queue-Based API Works Better',
        paragraphs: [
          'The API now validates input, persists the assignment, enqueues a BullMQ job, and responds quickly. All expensive model and PDF work happens in a dedicated worker process.',
        ],
        bullets: [
          'The browser gets a response in under 300 ms.',
          'Long-running generation does not block request threads.',
          'Retries and failure handling live in the queue where they belong.',
        ],
      },
      {
        heading: 'Progress Instead of a Black Box',
        paragraphs: [
          'A queue alone is not enough. Users still need feedback, so the worker emits stage-level progress through Redis Pub/Sub and Socket.io rooms.',
        ],
        bullets: [
          'Analyzing input',
          'Building the prompt',
          'Generating questions',
          'Parsing and validating output',
          'Saving and rendering the PDF',
        ],
      },
      {
        heading: 'Validation Has to Happen Twice',
        paragraphs: [
          'LLM output is untrusted. Paper Pilot validates the generated structure before persistence and again before PDF rendering so malformed output cannot leak further downstream.',
        ],
      },
      {
        heading: 'The Main Lesson',
        bullets: [
          'If the work is slow, do not pretend it is a normal request-response flow.',
          'Background workers plus real-time progress create a better user experience than blocking spinners.',
          'Schema validation is mandatory when model output feeds production workflows.',
        ],
      },
    ],
    closingNote:
      'This post was generated from the Paper Pilot architecture details already captured in the portfolio project data.',
    sourceUrl: 'https://github.com/imsumit28/paperpilot',
  },
];

export const getBlogPostBySlug = (slug) =>
  blogPosts.find((post) => post.slug === slug);
