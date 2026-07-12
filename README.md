# Sumit Kumar Portfolio Website

Full-stack portfolio application with a React/Vite frontend and Express API backend.

## Stack
- Frontend: React 18, Vite, Bootstrap, Framer Motion, Axios
- Backend: Express, Mongoose, JWT auth, Multer uploads
- Email: Resend (HTML contact notifications, server-side)
- Database: MongoDB
- CI: GitHub Actions (server test suite)

## Architecture
- `client/` serves the portfolio UI and admin pages.
- `server/` exposes REST APIs under `/api/*`.
- Public project cards are rendered from local static project metadata with optional API-augmented project entries.
- Contact form submissions go through the API only: the server validates, rate-limits, persists to MongoDB, and sends a branded HTML notification email via Resend (`server/utils/contactEmail.js`), with reply-to set to the sender. Web3Forms acts only as an automatic fallback when Resend is not configured. No email provider keys ship to the browser.

## Security Controls
- JWT-protected admin routes (`/api/projects/*`, `/api/contact/*` read/update paths)
- Route-level and global rate limiting
- Input validation for auth and contact endpoints
- CORS allowlist via `CLIENT_URL`

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
- Frontend: Vercel (`client/` root)
- Backend: Render (`server/` root)
- Keep `CLIENT_URL` and `VITE_API_URL` aligned

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

## Links
- [Architecture](./docs/architecture.md)
- [Performance](./docs/performance.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [Resume (PDF)](./docs/Sumit_Kumar_Full_Stack_Developer_Resume.pdf)
