import { fetchLatestLeetCodeSubmission } from '../lib/leetcodeLatest.js';

const LATEST_PATH = /^\/api\/leetcode\/latest\/([a-zA-Z0-9_-]{1,64})$/;

export function leetcodeApiPlugin() {
  return {
    name: 'leetcode-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'GET') return next();

        const pathname = req.url?.split('?')[0] || '';
        const match = pathname.match(LATEST_PATH);
        if (!match) return next();

        res.setHeader('Content-Type', 'application/json');
        try {
          const data = await fetchLatestLeetCodeSubmission(match[1]);
          res.end(JSON.stringify(data));
        } catch (err) {
          const message = err?.message || 'Failed to fetch LeetCode data';
          const status = message.includes('Invalid') ? 400 : message.includes('No recent') ? 404 : 502;
          res.statusCode = status;
          res.end(JSON.stringify({ message }));
        }
      });
    },
  };
}
