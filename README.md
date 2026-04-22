<div align="center">
  <h1>Sumit Kumar | Full Stack Developer Portfolio</h1>
  <p>
    A high-performance, fully responsive personal portfolio built from the ground up using the MERN stack. Designed with an Apple-inspired minimalist dark-mode aesthetic, recruiter-optimized content hierarchy, and a focus on real-world engineering impact.
  </p>
  <a href="#features"><strong>Explore the docs »</strong></a>
  <br />
  <br />
  <a href="https://github.com/imsumit28/portfolio-website">View Demo</a>
  ·
  <a href="https://github.com/imsumit28/portfolio-website/issues">Report Bug</a>
  ·
  <a href="https://github.com/imsumit28/portfolio-website/issues">Request Feature</a>
</div>

---

## Features

- **Apple-Inspired Dark Mode UI:** Custom design system using emerald green (`#10b981`) accents, glassmorphism containers, and smooth AOS animations throughout.
- **Cinematic Projects Layout:** Featured Z-pattern alternating layout — each project takes full-width with a large image and detailed content panel for maximum visual weight.
- **Live GitHub Contribution Calendar:** Embedded `react-github-calendar` in the About section showing real-time coding activity — auto-updates every time you push a commit.
- **Recruiter-Optimized Experience Section:** Verified internship card (EncodersPro, June–July 2025) with measurable impact metrics displayed as the primary experience entry.
- **Professional Contact Section:** Availability indicator ("Actively looking — responding within 24hrs"), hover-underline links, and a correctly labeled contact form.
- **Back-to-Top Footer:** `<Sumit Kumar />` logo link in the footer scrolls back to hero; consistent social icon hover states across GitHub, LinkedIn, and Email.
- **Admin Dashboard:** Secure backend portal protected by JWT authentication to manage portfolio data and view unread contact messages.
- **Direct Mail Integration:** Contact form wired directly to Nodemailer with rate limiting for spam protection.
- **Fully Responsive:** Fluid layouts with Bootstrap and Flexbox across all device sizes.

## Built With

* **Frontend:** React.js, Vite, Vanilla CSS, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **Key Libraries:** `react-github-calendar`, `react-simple-typewriter`, AOS, Nodemailer, Express-Rate-Limit

## Sections

| Section | Description |
|---|---|
| **Hero** | Typewriter role animation, CTA buttons, social links |
| **About** | Stats grid, Journey timeline, live GitHub calendar |
| **Skills** | Categorized tech stack with icon chips |
| **Experience** | Internship card + independent projects (Agile/metric-driven) |
| **Education** | Condensed academic section with key project highlights |
| **Projects** | Cinematic featured layout with live demo & GitHub links |
| **Resume** | Inline PDF preview with download button |
| **Contact** | Contact form + availability status + social links |

## Local Setup

Follow these steps to spin up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
* Node.js (v18 or higher)
* MongoDB (running locally or a MongoDB Atlas connection string)
* npm

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/imsumit28/portfolio-website.git
   cd portfolio-website
   ```

2. **Install Client Dependencies**
   ```sh
   cd client
   npm install
   ```

3. **Install Server Dependencies**
   ```sh
   cd ../server
   npm install
   ```

4. **Set up Environment Variables**
   Create a `.env` file in the `server` directory with the following keys:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_super_secret_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

5. **Run the Application**

   *Terminal 1 (Backend):*
   ```sh
   cd server
   npm start
   ```

   *Terminal 2 (Frontend):*
   ```sh
   cd client
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173/`.

### Admin Dashboard Access

Navigate to `/admin/login` on the frontend and log in. You will need to manually seed a user document into your MongoDB `users` collection with the matching credentials.

## Contact / Network

Sumit Kumar — [LinkedIn](https://linkedin.com/in/imsumit45/) — [ersumitkumar45@gmail.com](mailto:ersumitkumar45@gmail.com)

Project Link: [https://github.com/imsumit28/portfolio-website](https://github.com/imsumit28/portfolio-website)
