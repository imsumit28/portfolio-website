const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { protect, requireAdmin } = require('../middleware/auth');

// Rate limiter: max 3 requests per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'test' ? 100 : 3,
  message: { message: 'Too many messages sent. Please wait 15 minutes before sending another.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const sendWeb3FormsNotification = async ({ name, email, message }) => {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return { ok: false, reason: 'missing_key' };
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      message,
      subject: `New Portfolio Message from ${name}`,
      from_name: 'Portfolio Contact'
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error('Web3Forms request failed', {
      status: response.status,
      body: body.slice(0, 500)
    });
    return { ok: false, reason: 'provider_error', status: response.status };
  }

  return { ok: true };
};

// @route   POST api/contact
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const normalizedName = typeof name === 'string' ? name.trim() : '';
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const normalizedMessage = typeof message === 'string' ? message.trim() : '';

    if (!normalizedName || !normalizedEmail || !normalizedMessage) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    if (normalizedName.length > 100 || normalizedMessage.length > 2000) {
      return res.status(400).json({ message: 'Input exceeds allowed length' });
    }

    // Save to database
    const contact = new Contact({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage
    });
    await contact.save();

    const notification = await sendWeb3FormsNotification({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage
    });

    if (!notification.ok) {
      if (notification.reason === 'missing_key') {
        console.error('WEB3FORMS_ACCESS_KEY is not set; contact message was saved but no email was sent.');
        return res.status(202).json({
          message: 'Message saved, but email notification is not configured.'
        });
      }

      return res.status(502).json({
        message: 'Message saved, but email notification failed. Please try again later.'
      });
    }

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/contact
router.get('/', protect, requireAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/contact/:id/read
router.put('/:id/read', protect, requireAdmin, async (req, res) => {
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
