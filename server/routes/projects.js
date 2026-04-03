const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// @route   GET api/projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/projects/:id
router.get('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/projects
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const projectData = { ...req.body };
    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }
    if (projectData.technologies && typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
    }

    const project = new Project(projectData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT api/projects/:id
router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const projectData = { ...req.body };
    if (req.file) {
      projectData.image = `/uploads/${req.file.filename}`;
    }
    if (projectData.technologies && typeof projectData.technologies === 'string') {
      projectData.technologies = projectData.technologies.split(',').map(t => t.trim());
    }

    project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE api/projects/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
