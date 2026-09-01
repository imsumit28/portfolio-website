const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const app = express();

// Required when running behind a proxy/CDN (Render, Vercel, Heroku, Nginx)
// so express-rate-limit reads the real client IP from X-Forwarded-For.
app.set('trust proxy', 1);

// Security headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' } // /uploads served to other origins
}));

// Global API rate limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests from this IP, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Configure CORS to restrict to known origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  'https://sumitkr.dev',
  'https://www.sumitkr.dev',
  'http://localhost:5173'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());

app.use('/api', globalLimiter);

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/leetcode', require('./routes/leetcode'));

app.get('/', (req, res) => res.send('Portfolio API Running'));

app.use((req, res) => res.status(404).json({ message: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err && err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: err.message });
  }
  res.status(err.status || 500).json({ message: 'Server error' });
});

module.exports = app;
