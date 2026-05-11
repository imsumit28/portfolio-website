const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

// Rate limiter: max 3 requests per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { message: 'Too many messages sent. Please wait 15 minutes before sending another.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// @route   POST api/contact
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/contact
router.get('/', protect, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/contact/:id/read
router.put('/:id/read', protect, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    
    message.isRead = true;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
