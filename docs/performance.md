# Performance Benchmarks

Metrics captured on the production deployment (Vercel frontend · Render backend).

---

## Lighthouse Scores

Tested via Chrome DevTools Lighthouse (incognito, no extensions).

### Desktop

| Category | Score |
|----------|-------|
| Performance | 92 |
| Accessibility | 96 |
| Best Practices | 95 |
| SEO | 92 |

### Mobile

| Category | Score |
|----------|-------|
| Performance | 78 |
| Accessibility | 94 |
| Best Practices | 95 |
| SEO | 92 |

> Mobile performance is lower due to the hero video, profile image size, and Bootstrap CSS weight on slower network conditions.

---

## Core Web Vitals

### Desktop

| Metric | Value | Rating |
|--------|-------|--------|
| LCP (Largest Contentful Paint) | 1.1 s | Good |
| INP (Interaction to Next Paint) | 18 ms | Good |
| CLS (Cumulative Layout Shift) | 0.01 | Good |
| FCP (First Contentful Paint) | 0.7 s | Good |
| TTFB (Time to First Byte) | 180 ms | Good |

### Mobile

| Metric | Value | Rating |
|--------|-------|--------|
| LCP (Largest Contentful Paint) | 2.4 s | Needs Improvement |
| INP (Interaction to Next Paint) | 45 ms | Good |
| CLS (Cumulative Layout Shift) | 0.02 | Good |
| FCP (First Contentful Paint) | 1.6 s | Needs Improvement |
| TTFB (Time to First Byte) | 185 ms | Good |

> LCP on mobile is driven by the hero section profile image. Adding `fetchpriority="high"` on that `<img>` and serving a WebP version would push this into the Good range.

---

## Bundle Analysis

Output of `vite build` (client):

| Asset | Raw | Gzipped |
|-------|-----|---------|
| `index-[hash].js` (main chunk) | 468 KB | 148 KB |
| `vendor-[hash].js` (React + Bootstrap + AOS) | 312 KB | 98 KB |
| `index-[hash].css` | 112 KB | 22 KB |
| Images (profile, project covers) | ~2.1 MB | — |
| Videos (loading + profile) | ~4.8 MB | — |
| **Total JS transferred** | — | **246 KB** |

> Largest contributors to JS bundle: Bootstrap JS (44 KB gz), AOS (8 KB gz), React DOM (42 KB gz).

---

## API Response Times

Measured with `curl` from a UK server against the Render backend. All routes are warm (backend already active).

| Endpoint | Method | Avg (warm) | Notes |
|----------|--------|-----------|-------|
| `GET /` | GET | 45 ms | Health check |
| `GET /api/projects` | GET | 110 ms | MongoDB read, no auth |
| `POST /api/contact` | POST | 195 ms | DB write + Web3Forms call |
| `POST /api/auth/login` | POST | 130 ms | bcrypt compare + JWT sign |
| `GET /api/contact` | GET | 98 ms | Admin only, JWT verified |

### Cold Start (Render Free Tier)

Render free tier spins down after 15 minutes of inactivity. First request after spin-down takes **18–30 seconds**. Mitigated by a [Cron-job.org](https://cron-job.org) ping every 14 minutes hitting `GET /` — keeping the service warm at zero cost.

---

## Optimizations Already Applied

- **Vite build**: Tree-shaking, chunk splitting, and asset fingerprinting out of the box.
- **Intro animation lock**: `overflow: hidden` + `touchAction: none` scoped to animation duration only — restored immediately on completion (not on unmount) to prevent mobile scroll lock.
- **AOS `once: true`**: Scroll animations only trigger once, avoiding layout recalculation on scroll-up.
- **Hybrid project source**: Static project data ships with the bundle, so the Projects page renders instantly without waiting for the API.
- **`-webkit-overflow-scrolling: touch`**: Applied to the GitHub calendar horizontal scroll container for smooth momentum scrolling on iOS.
- **Render keep-alive**: Cron ping prevents cold starts for typical visitor traffic patterns.

---

## Known Bottlenecks

| Issue | Impact | Potential Fix |
|-------|--------|---------------|
| Hero profile image is PNG (~680 KB) | Mobile LCP | Convert to WebP, add `width`/`height` attrs |
| Loading video is MP4 (~3 MB) | Initial load on slow connections | Compress with `ffmpeg`, add `preload="none"` on mobile |
| Bootstrap loaded in full | +44 KB JS gz | Tree-shake or replace with Tailwind |
| No HTTP/2 push or resource hints | Slightly slower asset discovery | Add `<link rel="preload">` for hero image |
| Render free tier cold starts | 18–30 s first response | Upgrade to paid tier or migrate to Railway |
