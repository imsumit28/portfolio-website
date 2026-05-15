const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Visitor = require('../models/Visitor');

// Prevent abuse: max 5 increments per IP per hour
const incrementLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { message: 'Too many visit registrations from this IP' },
  standardHeaders: true,
  legacyHeaders: false,
});

// @route   POST api/visitors
// @desc    Increment visitor count by 1 and return the new total
router.post('/', incrementLimiter, async (req, res) => {
  try {
    const visitor = await Visitor.findOneAndUpdate(
      { key: 'global' },
      { $inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.json({ count: visitor.count });
  } catch (error) {
    console.error('Visitor increment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/visitors
// @desc    Read the current visitor count without incrementing
router.get('/', async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ key: 'global' });
    res.json({ count: visitor ? visitor.count : 0 });
  } catch (error) {
    console.error('Visitor read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
