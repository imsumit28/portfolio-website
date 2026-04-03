<div align="center">
  <h1>Sumit Kumar | Developer Portfolio</h1>
  <p>
    A high-performance, fully responsive personal portfolio and blog built from the ground up using the MERN stack. Designed with a focus on modern UI/UX aesthetics, scalable architecture, and raw recruiter conversion.
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

## ✨ Features

- **Modern UI/UX:** Built with a custom "Modern Glass" aesthetic featuring emerald green accents and dark-mode optimization.
- **Dynamic Projects Showcase:** Easily display technical projects, case studies, and code repositories with metric-driven bullet points.
- **Admin Dashboard:** Secure backend portal protected by JWT authentication to manage portfolio data and view unread contact messages.
- **Direct Mail Integration:** Contact form wired directly to Nodemailer, pushing encrypted messages securely to an admin inbox with rate limiting for spam protection.
- **Fully Responsive:** Fluid layouts designed with Bootstrap and Flexbox to guarantee a 10/10 experience on all devices, from massive ultra-wides to mobile screens.

## 🛠️ Built With

* **Frontend:** React.js, Vite, Vanilla CSS, Bootstrap
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JSON Web Tokens (JWT)
* **Utilities:** Nodemailer (Emails), Express-Rate-Limit (Security), AOS (Animations)

## ⚙️ Local Setup

Follow these steps to spin up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
* Node.js (v18 or higher)
* MongoDB (running locally or a MongoDB Atlas connection string)
* npm or yarn

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
   Create a `.env` file in the `server` directory and add the following keys:
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

### 🛡️ Admin Dashboard Access
To access the Admin panel, navigate to `/auth` on your frontend and log in. You will need to manually seed a user document into your MongoDB `users` collection with the matching credentials.

## 🤝 Contact / Network

Sumit Kumar - [LinkedIn](https://linkedin.com/in/imsumit45/) - [ersumitkumar45@gmail.com](mailto:ersumitkumar45@gmail.com)

Project Link: [https://github.com/imsumit28/portfolio-website](https://github.com/imsumit28/portfolio-website)
