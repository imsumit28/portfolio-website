const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'global',
    unique: true,
    index: true
  },
  count: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Visitor', VisitorSchema);
