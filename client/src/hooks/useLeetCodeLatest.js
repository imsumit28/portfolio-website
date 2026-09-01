import { useEffect, useState } from 'react';

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
const cacheKey = (username) => `lc-latest:v2:${username}`;

export default function useLeetCodeLatest(username) {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return undefined;
    let cancelled = false;
    const controller = new AbortController();

    try {
      const cached = JSON.parse(sessionStorage.getItem(cacheKey(username)) || 'null');
      if (cached && Date.now() - cached.ts < CACHE_TTL) {
        setSubmission(cached.submission);
        setLoading(false);
        return undefined;
      }
    } catch {
      /* ignore malformed cache */
    }

    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/leetcode/latest/${encodeURIComponent(username)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('fetch failed');
        const data = await res.json();
        if (cancelled) return;
        setSubmission(data);
        try {
          sessionStorage.setItem(
            cacheKey(username),
            JSON.stringify({ ts: Date.now(), submission: data }),
          );
        } catch {
          /* storage full / disabled — non-fatal */
        }
      } catch {
        if (!cancelled) setSubmission(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username]);

  return { submission, loading };
}
