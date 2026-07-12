# Performance Benchmarks

Two snapshots are tracked here:

- **April 2026 baseline** — Lighthouse / Core Web Vitals measured on the production deployment before the optimization pass.
- **July 2026 optimization pass** — build-level numbers measured locally from `vite build` after the asset and dependency overhaul. Lighthouse / CWV need re-measuring once this build is deployed (see checklist at the bottom).

---

## Lighthouse Scores — April 2026 baseline (pre-optimization)

Tested via Chrome DevTools Lighthouse (incognito, no extensions) on the previous production build.

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

> Mobile performance was dragged down by the intro video, a ~680 KB PNG hero image, and Bootstrap JS weight — all addressed in the July 2026 pass below.

## Core Web Vitals — April 2026 baseline

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

> Mobile LCP was driven by the hero image. The July pass serves it as WebP with `fetchpriority="high"` and explicit `width`/`height` — re-measure after deploy.

---

## July 2026 Optimization Pass

All numbers below are measured, not estimated: image sizes from the files on disk, JS/CSS from `vite build` gzip output.

### Asset diet

| Asset | Before | After | Change |
|-------|--------|-------|--------|
| Project covers (5) | 2,558 KB PNG | 137 KB WebP (max-width 1000, q80) | −95% |
| Hero photo | ~680 KB PNG | 51 KB WebP (+ 70 KB JPEG fallback via `<picture>`) | −93% |
| Favicon | 272 KB (512px PNG) | 8 KB (64px PNG) | −97% |
| Intro loading video | 688 KB MP4 | removed (CSS-only intro) | −100% |
| VIT logo | 52 KB campus-photo JPEG (wrong asset) | 11 KB seal PNG, self-hosted | −79% |
| Unused images (`profile.png`, `about-devconnect.png`, `profile.jpg`, `favicon.svg`) | ~1,590 KB | deleted | −100% |
| Skill icons (19) | jsDelivr/Wikipedia hotlinks (one 404'd silently) | bundled local SVGs | no runtime CDN dependency |

Total `dist/` output is now **1.8 MB**, of which 490 KB is the About-section video (`preload="metadata"`, so it doesn't block first paint).

### JavaScript & CSS (vite build, gzip)

| Asset | Raw | Gzipped |
|-------|-----|---------|
| `index-[hash].js` (main chunk) | 510 KB | 166.5 KB |
| `Tooltip-[hash].js` (lazy chunk, GitHub calendar) | 47 KB | 17.4 KB |
| `index-[hash].css` (site + Bootstrap CSS) | 289 KB | 42.8 KB |
| **Total JS transferred** | — | **~184 KB** |

Dependency changes that got there: removed AOS, Tailwind, react-bootstrap, react-simple-typewriter, and the Bootstrap JS bundle — **92 npm packages gone**; scroll animations now ride on Framer Motion (already in the bundle) via shared `whileInView` presets.

### Rendering & loading behavior

- Hero image: `<picture>` WebP/JPEG, `fetchpriority="high"`, explicit `width`/`height` (no CLS from the hero).
- Below-the-fold images (education logos, skill icons): `loading="lazy"` with fixed dimensions.
- About video: `preload="metadata"` + `playsInline` + `loop` — ~490 KB no longer pulled eagerly on load.
- `MotionConfig reducedMotion="user"` disables animation for `prefers-reduced-motion` users at the library level.

### API Response Times — measured April 2026, endpoints unchanged

Measured with `curl` from a UK server against the Render backend, all routes warm.

| Endpoint | Method | Avg (warm) | Notes |
|----------|--------|-----------|-------|
| `GET /` | GET | 45 ms | Health check |
| `GET /api/projects` | GET | 110 ms | MongoDB read, no auth |
| `POST /api/contact` | POST | 195 ms | DB write + email call (now Resend; previously Web3Forms) |
| `POST /api/auth/login` | POST | 130 ms | bcrypt compare + JWT sign |
| `GET /api/contact` | GET | 98 ms | Admin only, JWT verified |

### Cold Start (Render Free Tier)

Render free tier spins down after 15 minutes of inactivity. First request after spin-down takes **18–30 seconds**. Mitigated by a [Cron-job.org](https://cron-job.org) ping every 14 minutes hitting `GET /` — keeping the service warm at zero cost.

---

## Remaining Bottlenecks

| Issue | Impact | Potential Fix |
|-------|--------|---------------|
| Main JS chunk is 510 KB raw (166 KB gz) | Parse cost on low-end mobile | Route-level code splitting (`React.lazy` for admin/blog pages) |
| Bootstrap CSS loaded in full (~200 KB of the 289 KB CSS) | +CSS parse, mostly unused rules | Replace remaining grid/utility usage with own CSS, drop Bootstrap |
| About-section video is 490 KB MP4 | Data cost on the About scroll | Re-encode with `ffmpeg` CRF 30 (~50% smaller) or swap for a poster + tap-to-play |
| Render free tier cold starts | 18–30 s first response | Paid tier, or accept with the cron keep-alive |

## Re-measure after deploy (checklist)

The April Lighthouse/CWV numbers no longer describe this build. After deploying:

1. Chrome DevTools → Lighthouse, incognito, Mobile + Desktop runs against the production URL.
2. Update the two score tables above and re-label them with the new date.
3. Expected movers: mobile LCP (hero WebP + `fetchpriority`), mobile Performance (smaller JS, no AOS/Bootstrap JS), CLS unchanged (already good), SEO (sitemap + canonical + OG tags shipped in the same pass).
