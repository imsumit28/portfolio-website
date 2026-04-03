const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  technologies: {
    type: [String],
    default: []
  },
  liveLink: {
    type: String
  },
  githubLink: {
    type: String
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
