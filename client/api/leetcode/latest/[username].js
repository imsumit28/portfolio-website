import { fetchLatestLeetCodeSubmission } from '../../../lib/leetcodeLatest.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const username = String(req.query.username || '').trim();
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  try {
    const data = await fetchLatestLeetCodeSubmission(username);
    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
    return res.status(200).json(data);
  } catch (err) {
    const message = err?.message || 'Failed to fetch LeetCode data';
    const status = message.includes('Invalid') ? 400 : message.includes('No recent') ? 404 : 502;
    return res.status(status).json({ message });
  }
}
