const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, requireAdmin } = require('../middleware/auth');
const rateLimit = require('express-rate-limit');

const TOKEN_TTL_SECONDS = 60 * 60 * 8; // 8 hours
const COOKIE_NAME = 'token';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many auth attempts. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isStrongPassword = (value) =>
  typeof value === 'string' &&
  value.length >= 12 &&
  /[a-z]/.test(value) &&
  /[A-Z]/.test(value) &&
  /\d/.test(value);

const normalizeCredentials = (email, password) => ({
  email: typeof email === 'string' ? email.trim().toLowerCase() : '',
  password: typeof password === 'string' ? password : ''
});

const cookieOptions = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: TOKEN_TTL_SECONDS * 1000,
    path: '/'
  };
};

const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role, tokenVersion: user.tokenVersion || 0 },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL_SECONDS, algorithm: 'HS256' }
  );

// @route   POST api/auth/register
// @access  Admin only — used to provision additional admins
router.post('/register', authLimiter, protect, requireAdmin, async (req, res) => {
  try {
    const { email, password } = normalizeCredentials(req.body.email, req.body.password);
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: 'Password must be at least 12 characters and contain upper, lower, and digit'
      });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const role = req.body.role === 'admin' ? 'admin' : 'user';
    const user = await User.create({ email, password, role });
    res.status(201).json({ user: { id: user._id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/auth/login
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { email, password } = normalizeCredentials(req.body.email, req.body.password);
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    const ok = user && (await user.matchPassword(password));
    if (!ok) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user);
    res.cookie(COOKIE_NAME, token, cookieOptions());
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: 0 });
  res.json({ message: 'Logged out' });
});

// @route   GET api/auth/user
router.get('/user', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
