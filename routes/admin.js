import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import protect from '../middleware/auth.js';
import Profile from '../models/Profile.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Project from '../models/Project.js';
import Achievement from '../models/Achievement.js';

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images and PDFs only!'));
  }
}

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    checkFileType(file, cb);
  },
});

// Protect all admin routes
router.use(protect);

// Upload Endpoint
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Return the relative URL path to be stored in the DB
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// --- PROFILE CRUD ---
router.put('/profile', async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
    } else {
      Object.assign(profile, req.body);
    }
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- EXPERIENCE CRUD ---
router.post('/experiences', async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json(exp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/experiences/:id', async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exp) return res.status(404).json({ message: 'Experience not found' });
    res.json(exp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/experiences/:id', async (req, res) => {
  try {
    const exp = await Experience.findByIdAndDelete(req.params.id);
    if (!exp) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- EDUCATION CRUD ---
router.post('/educations', async (req, res) => {
  try {
    const edu = await Education.create(req.body);
    res.status(201).json(edu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/educations/:id', async (req, res) => {
  try {
    const edu = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!edu) return res.status(404).json({ message: 'Education not found' });
    res.json(edu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/educations/:id', async (req, res) => {
  try {
    const edu = await Education.findByIdAndDelete(req.params.id);
    if (!edu) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- PROJECTS CRUD ---
router.post('/projects', async (req, res) => {
  try {
    const proj = await Project.create(req.body);
    res.status(201).json(proj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const proj = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!proj) return res.status(404).json({ message: 'Project not found' });
    res.json(proj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const proj = await Project.findByIdAndDelete(req.params.id);
    if (!proj) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- ACHIEVEMENTS CRUD ---
router.post('/achievements', async (req, res) => {
  try {
    const ach = await Achievement.create(req.body);
    res.status(201).json(ach);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/achievements/:id', async (req, res) => {
  try {
    const ach = await Achievement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ach) return res.status(404).json({ message: 'Achievement not found' });
    res.json(ach);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/achievements/:id', async (req, res) => {
  try {
    const ach = await Achievement.findByIdAndDelete(req.params.id);
    if (!ach) return res.status(404).json({ message: 'Achievement not found' });
    res.json({ message: 'Achievement removed' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
