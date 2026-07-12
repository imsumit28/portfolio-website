# Sumit Kumar Portfolio Website

Full-stack portfolio application with a React/Vite frontend and Express API backend. Live at [thesumitkumar.vercel.app](https://thesumitkumar.vercel.app).

## Stack

- **Frontend:** React 18, Vite, Bootstrap (CSS only), Framer Motion, Axios
- **Backend:** Express, Mongoose, JWT auth, Multer uploads
- **Email:** Resend — branded HTML contact notifications, sent server-side
- **Database:** MongoDB
- **CI:** GitHub Actions (server test suite)

## Architecture

- `client/` serves the portfolio UI and admin pages.
  - Home page is composed from section components in `src/components/home/` (Hero, About, Experience, Skills, Education, Resume, Contact).
  - Content lives in data modules (`src/data/homeData.js`, `skillsData.js`, `projectsData.js`, `blogPosts.js`), not in JSX.
  - Scroll animations use shared Framer Motion presets (`src/utils/motion.js`) with `MotionConfig reducedMotion="user"` for accessibility.
  - All images and skill icons are bundled locally — no runtime CDN or Wikipedia hotlinks. Project covers ship as WebP.
- `server/` exposes REST APIs under `/api/*`.
- Public project cards are rendered from local static project metadata with optional API-augmented project entries.
- Contact form submissions go through the API only: the server validates, rate-limits, persists to MongoDB, and sends a branded HTML notification email via Resend (`server/utils/contactEmail.js`), with reply-to set to the sender. Web3Forms acts only as an automatic fallback when Resend is not configured. No email provider keys ship to the browser.
- Unknown routes render a styled 404 page (`src/pages/NotFound.jsx`).

Diagrams and request lifecycles: [docs/architecture.md](./docs/architecture.md).

## Security Controls

- JWT-protected admin routes (`/api/projects/*`, `/api/contact/*` read/update paths)
- Route-level and global rate limiting (contact form: 3 submissions / 15 min / IP, enforced server-side and not bypassable from the browser)
- Input validation for auth and contact endpoints; contact email HTML-escapes all user input
- CORS allowlist via `CLIENT_URL`; Helmet security headers
- Fail-fast startup checks (`MONGODB_URI`, `JWT_SECRET` presence and strength)

## SEO

- `sitemap.xml` and `robots.txt` (admin routes disallowed) in `client/public/`
- Canonical URL, Open Graph + Twitter card tags with a 1200×628 `og-image.jpg`, and JSON-LD `Person` schema in `index.html`

## Performance

Measured after the July 2026 optimization pass (`vite build`, files on disk):

- ~184 KB total JS gzipped; project covers 2.5 MB PNG → 137 KB WebP; favicon 272 KB → 8 KB
- Hero image served as WebP via `<picture>` with `fetchpriority="high"` and explicit dimensions
- AOS, Tailwind, react-bootstrap, and the Bootstrap JS bundle removed (−92 npm packages)

Full numbers, Core Web Vitals baseline, and remaining bottlenecks: [docs/performance.md](./docs/performance.md).

## Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
CONTACT_NOTIFICATION_MODE=server
# Resend is the primary email provider for contact notifications
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=where_notifications_go@example.com
# Optional fallback, used only when Resend is not configured
WEB3FORMS_ACCESS_KEY=optional_web3forms_fallback_key
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Local Development

```bash
# from repo root
cd client && npm install
cd ../server && npm install

# terminal 1
cd server
npm run dev

# terminal 2
cd client
npm run dev
```

## Testing

```bash
cd server
npm test
```

## Deployment

- **Frontend:** Vercel (`client/` root). Only `VITE_API_URL` is needed as an env var.
- **Backend:** Render (`server/` root). Set the `server/.env` variables above in the Render dashboard — in particular `CONTACT_NOTIFICATION_MODE=server` plus the Resend keys, or contact emails won't send (messages still persist to MongoDB).
- Keep `CLIENT_URL` (Render) and `VITE_API_URL` (Vercel) pointing at each other.

## Screenshots

| Home | Projects |
| --- | --- |
| ![Home](./docs/screenshots/home.png) | ![Projects](./docs/screenshots/projects.png) |

| Contact | Admin Dashboard |
| --- | --- |
| ![Contact](./docs/screenshots/contact.png) | ![Admin Dashboard](./docs/screenshots/dashboard.png) |

## Notes

- Do not expose email provider keys in frontend code — all notification sending is server-side.
- If no email provider is configured (`RESEND_API_KEY`/`CONTACT_TO_EMAIL` or the `WEB3FORMS_ACCESS_KEY` fallback), contact submissions still persist to MongoDB and remain visible in the admin dashboard.
- Render free tier cold-starts after ~15 min idle (first request 18–30 s); a cron ping keeps it warm.

## Links

- [Architecture](./docs/architecture.md)
- [Performance](./docs/performance.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [Resume (PDF)](./docs/Sumit_Kumar_Full_Stack_Developer_Resume.pdf)
