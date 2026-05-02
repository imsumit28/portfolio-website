<div align="center">

# Sumit Kumar — Full Stack Developer Portfolio

*A production-ready portfolio built with modern web technologies, showcasing 3 sophisticated projects with real-time collaboration, distributed systems, and AI integration.*

[![React](https://img.shields.io/badge/React%2018-61DAFB?style=for-the-badge&logo=react&logoColor=black)](#)
[![Node.js](https://img.shields.io/badge/Node.js%2020-339933?style=for-the-badge&logo=node.js&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)](#)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](#)

[Live Demo](#) · [GitHub](https://github.com/imsumit28/portfolio-website) · [Contact](#contact)

</div>

---

## Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Featured Projects](#featured-projects)
- [Tech Stack](#tech-stack)
- [Portfolio Sections](#portfolio-sections)
- [Getting Started](#getting-started)
- [Admin Dashboard](#admin-dashboard)
- [Contributing](#contributing)

---

## About

A comprehensive full-stack portfolio application built with the **MERN stack** (MongoDB, Express, React, Node.js) showcasing professional work, real-time projects, and technical expertise. Engineered with production-grade practices including TypeScript, comprehensive testing, and security-first architecture.

**Key Highlights:**
- 3 production-deployed projects with live demos
- Custom video-based loading animation
- Dark mode UI with emerald green accents  
- JWT-protected admin dashboard
- Fully responsive across all devices
- Accessibility-optimized (AOS animations, semantic HTML)
- Nodemailer integration with rate limiting

---

## Key Features

### Design & UX
- **Cinematic Project Layout** — Alternating Z-pattern with full-width imagery and detailed content panels
- **Mobile-First Responsive** — Fluid Flexbox layouts optimized for desktop, tablet, and mobile
- **Custom Loading Animation** — Professionally designed video-based loading screen with smooth fade-out
- **Dark Mode UI** — Emerald green accent palette with smooth AOS scroll animations

##  Featured Projects

### 1. CollabDocs — Real-time Collaborative Document Editor
**Production-ready Google Docs alternative with CRDT-based conflict-free sync, AI writing assistance, and comprehensive test coverage.**

```
Y.js CRDT  ·  TypeScript  ·  AI Assistant  ·  45+ Test Cases  ·  60% Coverage
```

- Implemented Y.js CRDT for conflict-free real-time collaboration (~100ms latency)
- Built custom suggestions/track-changes using TipTap open-source extensions
- Engineered write-debounce strategy (5s inactivity) limiting writes to ≤12 per minute
- Integrated Groq Llama 3.3 70B API for AI writing assistant
- Shipped comprehensive Jest test suite (45+ tests, ~60% coverage)
- Designed horizontal scalability with Redis Socket.io adapter

**Tech Stack:** `Next.js 14` `React` `Node.js` `TypeScript` `Socket.io` `Y.js` `MongoDB` `Groq API`  
**Links:** [Live](https://collabdocs2026.vercel.app/) · [GitHub](https://github.com/imsumit28/CollabDocs)

---

### 2. NotifyX — Distributed Notification System
**Production-grade async notification platform with fault tolerance, queue persistence, and real-time delivery.**

```
BullMQ Job Queue  ·  Redis Pub/Sub  ·  Idempotency  ·  Rate Limiting
```

- Architected BullMQ with 5 retry attempts and exponential backoff
- Built Redis Pub/Sub → Socket.io pipeline for sub-50ms delivery
- Implemented two-layer idempotency (Redis SETNX + MongoDB unique index)
- Engineered sliding window rate limiting (10K req/min global, 50 req/min per user)
- Created batch notification system for repeated actions within 30s window

**Tech Stack:** `Node.js` `Express` `BullMQ` `Redis` `Socket.io` `MongoDB`  
**Links:** [GitHub](https://github.com/imsumit28/NotifyX)

---

### 3. DevConnect — Real-time Developer Network
**A full-stack social platform for developers to connect, collaborate, and share projects.**

```
Real-time Chat  ·  JWT Auth  ·  Profile Discovery  ·  Live Deployment
```

- Built JWT auth with refresh token rotation and protected routes
- Implemented low-latency Socket.io chat with sub-100ms delivery
- Engineered profile & project discovery matching algorithm

**Tech Stack:** `React` `Vite` `Node.js` `MongoDB` `Socket.io`  
**Links:** [Live](https://devconnect2026.vercel.app/) · [GitHub](https://github.com/imsumit28/DevConnect)

---
```
Y.js CRDT  ·  TypeScript  ·  AI Assistant  ·  45+ Test Cases  ·  60% Coverage
```

- Implemented Y.js CRDT for conflict-free real-time collaboration (~100ms latency)
- Built custom suggestions/track-changes using TipTap open-source extensions
- Engineered write-debounce strategy (5s inactivity) limiting writes to ≤12 per minute
- Integrated Groq Llama 3.3 70B API for AI writing assistant
- Shipped comprehensive Jest test suite (45+ tests, ~60% coverage)
- Designed horizontal scalability with Redis Socket.io adapter

**Tech Stack:** `Next.js 14` `React` `Node.js` `TypeScript` `Socket.io` `Y.js` `MongoDB` `Groq API`  
**Links:** [Live](https://collabdocs2026.vercel.app/) · [GitHub](https://github.com/imsumit28/CollabDocs)

---

## Tech Stack

| Category | Technologies |
|----------|---------------|
| **Frontend** | React 18, Next.js 14, Vite, TailwindCSS, Bootstrap, ProseMirror |
| **Backend** | Node.js, Express.js, TypeScript |
| **Database** | MongoDB (Mongoose ODM), Redis (Upstash) |
| **Real-time** | Socket.io, Y.js CRDT, Socket.io Redis Adapter |
| **Auth & Security** | JWT (HS256), bcryptjs, Passport.js (OAuth) |
| **AI/ML** | Groq API (Llama 3.3 70B) |
| **DevOps** | Docker, GitHub Actions, Vercel, Render, Railway |
| **Testing** | Jest, React Testing Library |
| **Tools** | ESLint, Prettier, TypeScript strict mode |

---

##  Portfolio Sections

| Section | Features |
|---------|----------|
| **Hero** | Typewriter animation, CTA buttons, social links |
| **About** | Stats grid, journey timeline, live GitHub contributions |
| **Skills** | Tech stack with categorized icon chips |
| **Experience** | Verified internship, impact metrics, project highlights |
| **Education** | Academic background with key achievements |
| **Projects** | Cinematic featured layout with live & GitHub links |
| **Resume** | Inline PDF preview with download button |
| **Contact** | Form with availability status and social links |

---

## Getting Started

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org/))
- MongoDB (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/imsumit28/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. **Configure environment variables**

   Create `server/.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_super_secret_string_32_chars_min
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start development servers**

   Terminal 1 — Backend:
   ```bash
   cd server && npm start
   ```

   Terminal 2 — Frontend:
   ```bash
   cd client && npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
# Frontend
cd client && npm run build

# Backend
cd server && npm run build
```

---

##  Admin Dashboard

### Access
Navigate to `/admin/login` after setting up MongoDB and seeding an admin user.

### Create Admin User
Run this in MongoDB shell or Compass:

```javascript
use portfolio

db.users.insertOne({
  email: "admin@example.com",
  password: "<bcrypt_hashed_password>",
  role: "admin",
  createdAt: new Date()
})
```

**Note:** Use [bcrypt-generator.com](https://bcrypt-generator.com) to hash your password before inserting.

### Features
-  View all incoming contact form submissions
-  Mark messages as read/unread
-  Delete spam or resolved messages
-  Real-time message notifications
-  JWT-protected access

---

##  Metrics

| Metric | Value |
|--------|-------|
| **Projects Deployed** | 3 production apps |
| **Test Coverage** | ~60% (CollabDocs) |
| **Real-time Latency** | <100ms (CRDT sync) |
| **Notification Delivery** | <50ms (sub-50ms) |
| **Chat Latency** | <100ms (Socket.io) |
| **Mobile Support** | Fully responsive |
| **API Documentation** | OpenAPI 3.0 (Swagger) |

---

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
-  TypeScript with strict mode
-  ESLint + Prettier formatting
-  60%+ test coverage for new features
-  Semantic commit messages

---

##  Contact

**Sumit Kumar**  
Full Stack Developer | MERN Stack Specialist

-  [LinkedIn](https://linkedin.com/in/imsumit45/)
-  [Email](mailto:ersumitkumar45@gmail.com)
-  [GitHub](https://github.com/imsumit28)

---

<div align="center">

**Made with ❤️ by Sumit Kumar**

[⬆ back to top](#sumit-kumar--full-stack-developer-portfolio)

</div>
