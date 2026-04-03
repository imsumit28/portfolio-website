const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const Contact = require('../models/Contact');
const { protect } = require('../middleware/auth');

// Rate limiter: max 3 requests per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { message: 'Too many messages sent. Please wait 15 minutes before sending another.' }
});

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// @route   POST api/contact
router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email notification
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; border-radius: 10px;">
          <h2 style="color: #10b981; margin-bottom: 20px;">📬 New Contact Message</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
            <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0 0 10px;"><strong>Message:</strong></p>
            <p style="margin: 0; padding: 10px; background: #f1f5f9; border-radius: 6px; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px; text-align: center;">Sent from your Portfolio Website</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

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
