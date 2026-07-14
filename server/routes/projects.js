const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect, requireAdmin } = require('../middleware/auth');
const { upload, verifyImageSignature } = require('../middleware/upload');
const rateLimit = require('express-rate-limit');

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { message: 'Too many project upload operations. Please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const isSafeHttpUrl = (value) => {
  if (typeof value !== 'string' || value.trim() === '') return true; // empty = allowed
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

const sanitizeString = (value, max) => {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
};

const buildProjectPayload = (body, file) => {
  const payload = {};

  const title = sanitizeString(body.title, 200);
  if (title) payload.title = title;

  const description = sanitizeString(body.description, 5000);
  if (description) payload.description = description;

  if (body.liveLink !== undefined) {
    const v = sanitizeString(body.liveLink, 500);
    if (!isSafeHttpUrl(v)) throw new Error('liveLink must be a valid http(s) URL');
    payload.liveLink = v;
  }
  if (body.githubLink !== undefined) {
    const v = sanitizeString(body.githubLink, 500);
    if (!isSafeHttpUrl(v)) throw new Error('githubLink must be a valid http(s) URL');
    payload.githubLink = v;
  }

  if (body.order !== undefined) {
    const n = Number(body.order);
    payload.order = Number.isFinite(n) ? n : 0;
  }

  if (body.technologies !== undefined) {
    if (Array.isArray(body.technologies)) {
      payload.technologies = body.technologies
        .filter((t) => typeof t === 'string')
        .map((t) => t.trim().slice(0, 60))
        .filter(Boolean)
        .slice(0, 30);
    } else if (typeof body.technologies === 'string') {
      payload.technologies = body.technologies
        .split(',')
        .map((t) => t.trim().slice(0, 60))
        .filter(Boolean)
        .slice(0, 30);
    }
  }

  if (file) {
    payload.image = `/uploads/${file.filename}`;
  }

  return payload;
};

// @route   GET api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    console.error('Projects list error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/projects/:id
router.get('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error('Project read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/projects
router.post('/', protect, requireAdmin, uploadLimiter, upload.single('image'), verifyImageSignature, async (req, res) => {
  try {
    const payload = buildProjectPayload(req.body, req.file);
    if (!payload.title || !payload.description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }
    const project = await Project.create(payload);
    res.status(201).json(project);
  } catch (error) {
    if (error && /URL/.test(error.message)) {
      return res.status(400).json({ message: error.message });
    }
    console.error('Project create error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/projects/:id
router.put('/:id', protect, requireAdmin, uploadLimiter, upload.single('image'), verifyImageSignature, async (req, res) => {
  try {
    const existing = await Project.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Project not found' });

    const payload = buildProjectPayload(req.body, req.file);
    const project = await Project.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true
    });
    res.json(project);
  } catch (error) {
    if (error && /URL/.test(error.message)) {
      return res.status(400).json({ message: error.message });
    }
    console.error('Project update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/projects/:id
router.delete('/:id', protect, requireAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error('Project delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
