import express from 'express';
import Profile from '../models/Profile.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Project from '../models/Project.js';
import Achievement from '../models/Achievement.js';

const router = express.Router();

// @desc    Get all portfolio data
// @route   GET /api/portfolio
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get profile (or create a default one if none exists)
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create({
        name: "Raj Motwani",
        title: "Software Developer",
        bio: "I'm an enthusiastic geek and a Software Developer with a keen interest in technology and development.",
        email: "rajmotwani38@gmail.com",
        github: "https://github.com/raj3000k/",
        linkedin: "https://www.linkedin.com/in/raj-motwani-978143204/",
        twitter: "https://x.com/RAJMOTWANI16",
        availability: true,
        skills: []
      });
    }

    const experiences = await Experience.find().sort({ orderIndex: 1, createdAt: -1 });
    const educations = await Education.find().sort({ orderIndex: 1, createdAt: -1 });
    const projects = await Project.find().sort({ orderIndex: 1, createdAt: -1 });
    const achievements = await Achievement.find().sort({ orderIndex: 1, createdAt: -1 });

    res.json({
      profile,
      experiences,
      educations,
      projects,
      achievements
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
