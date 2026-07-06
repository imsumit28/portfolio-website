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

const sendResendNotification = async ({ name, email, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !toEmail) {
    return { ok: false, reason: 'missing_key' };
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`
    })
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    console.error('Resend request failed', {
      status: response.status,
      body: body.slice(0, 500)
    });
    return { ok: false, reason: 'provider_error', status: response.status };
  }

  return { ok: true };
};

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

    if (process.env.CONTACT_NOTIFICATION_MODE === 'browser') {
      return res.status(201).json({ message: 'Message sent successfully' });
    }

    let notification = await sendResendNotification({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage
    });

    if (!notification.ok && notification.reason === 'missing_key') {
      notification = await sendWeb3FormsNotification({
        name: normalizedName,
        email: normalizedEmail,
        message: normalizedMessage
      });
    }

    if (!notification.ok) {
      if (notification.reason === 'missing_key') {
        console.error('No email provider configured (RESEND_API_KEY/CONTACT_TO_EMAIL or WEB3FORMS_ACCESS_KEY); contact message was saved but no email was sent.');
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
