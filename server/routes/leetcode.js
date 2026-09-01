const express = require('express');

const router = express.Router();

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
const cache = new Map();

const RECENT_AC_QUERY = `
  query recentAc($username: String!, $limit: Int) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
    }
  }
`;

router.get('/latest/:username', async (req, res) => {
  const username = String(req.params.username || '').trim();
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(username)) {
    return res.status(400).json({ message: 'Invalid LeetCode username' });
  }

  const cached = cache.get(username);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.json(cached.data);
  }

  try {
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: RECENT_AC_QUERY,
        variables: { username, limit: 1 },
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ message: 'LeetCode API unavailable' });
    }

    const payload = await response.json();
    const latest = payload?.data?.recentAcSubmissionList?.[0];

    if (!latest?.title || !latest?.titleSlug) {
      return res.status(404).json({ message: 'No recent submissions found' });
    }

    const data = {
      title: latest.title,
      titleSlug: latest.titleSlug,
      timestamp: latest.timestamp ? Number(latest.timestamp) : null,
      url: `https://leetcode.com/problems/${latest.titleSlug}/`,
    };

    cache.set(username, { ts: Date.now(), data });
    return res.json(data);
  } catch (err) {
    console.error('LeetCode fetch failed:', err);
    return res.status(502).json({ message: 'Failed to fetch LeetCode data' });
  }
});

module.exports = router;
