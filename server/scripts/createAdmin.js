// Provision the initial admin user.
// Usage:
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='LongStrongPass123' node scripts/createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const run = async () => {
  const email = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || '';

  if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD env vars before running.');
    process.exit(1);
  }
  if (password.length < 12 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)) {
    console.error('Password must be 12+ chars and include upper, lower, and digit.');
    process.exit(1);
  }
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      existing.password = password;
      existing.role = 'admin';
      await existing.save();
      console.log(`Updated existing user ${email} → admin and reset password.`);
    } else {
      await User.create({ email, password, role: 'admin' });
      console.log(`Created admin ${email}.`);
    }
  } finally {
    await mongoose.connection.close();
  }
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
