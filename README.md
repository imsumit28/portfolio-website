<div align="center">

# Sumit Kumar — Full Stack Developer Portfolio

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)

> 🔗 **Live:** _Deployment coming soon_

</div>

![Portfolio Preview](./preview.png?v=2)

---

## What This Is

A personal portfolio built with the MERN stack (MongoDB, Express, React, Node.js). It showcases projects, verified work experience, education, and a live GitHub contribution calendar — structured specifically for recruiter and engineering review. Features a dark-mode UI with emerald green accents, AOS scroll animations, and a secure admin dashboard for managing contact messages.

---

## Features

- **Cinematic Project Layout:** Featured alternating Z-pattern layout — each project is full-width with a large image and detailed content panel.
- **Live GitHub Contribution Calendar:** Embedded in the About section; auto-updates every time you push a commit. No API key required.
- **Recruiter-Optimized Experience Section:** Verified internship card with measurable impact metrics (20% bug backlog reduction) displayed as the primary experience entry.
- **Professional Contact Section:** Availability indicator ("Actively looking — responding within 24hrs"), hover-underline social links, and correct placeholder labels.
- **Back-to-Top Footer:** `<Sumit Kumar />` logo link scrolls back to hero; consistent social icon states across GitHub, LinkedIn, and Email.
- **Custom Mobile Navigation:** Slide-in drawer with animated hamburger → ✕ icon, emerald active-link highlighting, body scroll lock, and auto-close on tap.
- **Performance Optimized:** Tree-shaken icon imports, Suspense skeleton for the GitHub API call, corrected heading hierarchy (`h1 → h2`), and SEO meta tags + `robots.txt`.
- **Admin Dashboard:** JWT-protected portal to view and manage incoming contact messages.
- **Direct Mail Integration:** Contact form wired to Nodemailer with rate limiting for spam protection.
- **Fully Responsive:** Fluid layouts with Flexbox across all device sizes — desktop, tablet, and mobile.

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React.js, Vite, Vanilla CSS, Bootstrap |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (JSON Web Tokens) |
| Key Libraries | `react-github-calendar`, `react-simple-typewriter`, AOS, Nodemailer, Express-Rate-Limit |

---

## Sections

| Section | Description |
|---|---|
| **Hero** | Typewriter role animation, CTA buttons, social icon links |
| **About** | Stats grid, Journey timeline, live GitHub contribution calendar |
| **Skills** | Categorized tech stack with icon chips |
| **Experience** | Internship card + independent projects with Agile/metric-driven bullets |
| **Education** | Condensed academic background with key project highlights |
| **Projects** | Cinematic featured layout with live demo & GitHub links |
| **Resume** | Inline PDF preview with download button |
| **Contact** | Contact form + availability status indicator + social links |

---

## Local Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local instance or MongoDB Atlas URI)
- npm

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/imsumit28/portfolio-website.git
   cd portfolio-website
   ```

2. **Install client dependencies**
   ```sh
   cd client && npm install
   ```

3. **Install server dependencies**
   ```sh
   cd ../server && npm install
   ```

4. **Set up environment variables**

   Create a `.env` file inside the `server/` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_super_secret_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

5. **Run the application**

   *Terminal 1 — Backend:*
   ```sh
   cd server && npm start
   ```

   *Terminal 2 — Frontend:*
   ```sh
   cd client && npm run dev
   ```

6. Open `http://localhost:5173/` in your browser.

---

## Admin Dashboard

Navigate to `/admin/login`. You need a seeded admin user in MongoDB to log in.

Run this in the MongoDB shell (or MongoDB Compass) to create the admin account:

```js
use portfolio

db.users.insertOne({
  email: "your_email@gmail.com",
  password: "<bcrypt_hashed_password>",
  role: "admin"
})
```

> **Note:** The password must be bcrypt-hashed. Use a tool like [bcrypt-generator.com](https://bcrypt-generator.com) or write a one-time Node.js script to hash your password before inserting.

---

## Contact

Sumit Kumar — [LinkedIn](https://linkedin.com/in/imsumit45/) — [ersumitkumar45@gmail.com](mailto:ersumitkumar45@gmail.com)

Project Link: [https://github.com/imsumit28/portfolio-website](https://github.com/imsumit28/portfolio-website)
