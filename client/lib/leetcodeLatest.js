const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';

const RECENT_AC_QUERY = `
  query recentAc($username: String!, $limit: Int) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
    }
  }
`;

export async function fetchLatestLeetCodeSubmission(username) {
  const safeUsername = String(username || '').trim();
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(safeUsername)) {
    throw new Error('Invalid LeetCode username');
  }

  const response = await fetch(LEETCODE_GRAPHQL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: RECENT_AC_QUERY,
      variables: { username: safeUsername, limit: 1 },
    }),
  });

  if (!response.ok) {
    throw new Error('LeetCode API unavailable');
  }

  const payload = await response.json();
  const latest = payload?.data?.recentAcSubmissionList?.[0];

  if (!latest?.title || !latest?.titleSlug) {
    throw new Error('No recent submissions found');
  }

  return {
    title: latest.title,
    titleSlug: latest.titleSlug,
    timestamp: latest.timestamp ? Number(latest.timestamp) : null,
    url: `https://leetcode.com/problems/${latest.titleSlug}/`,
  };
}
