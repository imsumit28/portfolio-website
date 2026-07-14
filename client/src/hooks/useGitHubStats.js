import { useEffect, useState } from 'react';

// Live GitHub metrics, fetched from public (unauthenticated) endpoints so the
// numbers shown are always real and current — never hardcoded.
//   - api.github.com          → public repo count, followers, join year
//   - api.github.com/.../repos → summed star count across owned repos
//   - github-contributions-api → total contributions + current streak
//     (same data source the contribution heatmap itself uses)
const USER_API = (u) => `https://api.github.com/users/${u}`;
const REPOS_API = (u) => `https://api.github.com/users/${u}/repos?per_page=100&type=owner`;
const CONTRIB_API = (u) => `https://github-contributions-api.jogruber.de/v4/${u}?y=last`;

const cacheKey = (u) => `gh-stats:${u}`;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

// Consecutive days with at least one contribution, counting back from today.
// Today is allowed to be empty (not committed yet) without breaking the streak.
const computeStreak = (contributions) => {
  let streak = 0;
  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      streak++;
    } else if (i === contributions.length - 1) {
      continue;
    } else {
      break;
    }
  }
  return streak;
};

export default function useGitHubStats(username) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return undefined;
    let cancelled = false;
    const controller = new AbortController();

    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey(username)) || 'null');
      if (cached && Date.now() - cached.ts < CACHE_TTL) {
        setStats(cached.stats);
        setLoading(false);
        return undefined;
      }
    } catch {
      /* ignore malformed cache */
    }

    const load = async () => {
      setLoading(true);
      const [userRes, reposRes, contribRes] = await Promise.allSettled([
        fetch(USER_API(username), { signal: controller.signal }),
        fetch(REPOS_API(username), { signal: controller.signal }),
        fetch(CONTRIB_API(username), { signal: controller.signal }),
      ]);

      const next = {};
      try {
        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          const u = await userRes.value.json();
          next.repos = typeof u.public_repos === 'number' ? u.public_repos : null;
          next.followers = typeof u.followers === 'number' ? u.followers : null;
          next.since = u.created_at ? new Date(u.created_at).getFullYear() : null;
        }
        if (reposRes.status === 'fulfilled' && reposRes.value.ok) {
          const repos = await reposRes.value.json();
          if (Array.isArray(repos)) {
            next.stars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
          }
        }
        if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
          const data = await contribRes.value.json();
          const contributions = Array.isArray(data.contributions) ? data.contributions : [];
          // Prefer GitHub's authoritative "last year" total; fall back to summing.
          next.contributions = typeof data.total?.lastYear === 'number'
            ? data.total.lastYear
            : contributions.reduce((sum, c) => sum + (c.count || 0), 0);
          next.streak = computeStreak(contributions);
        }
      } catch {
        /* leave whatever we managed to parse */
      }

      if (cancelled) return;
      if (Object.keys(next).length > 0) {
        setStats(next);
        try {
          sessionStorage.setItem(cacheKey(username), JSON.stringify({ ts: Date.now(), stats: next }));
        } catch {
          /* storage full / disabled — non-fatal */
        }
      }
      setLoading(false);
    };

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username]);

  return { stats, loading };
}
