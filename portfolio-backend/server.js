import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import portfolioRoutes from './routes/portfolio.js';
import adminRoutes from './routes/admin.js';
import User from './models/User.js';
import https from 'https';

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Setup relative path for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/admin', adminRoutes);

// Simple health check endpoint
app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// Auto-seed admin user
const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      await User.create({
        username: 'admin',
        password: password
      });
      console.log('Default Admin Account Created: admin / ' + password);
    }
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
  }
};
seedAdmin();

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Self-ping to prevent Render free tier from sleeping
const pingSelf = () => {
  const url = process.env.RENDER_EXTERNAL_URL;
  if (!url) return;

  console.log(`Setting up keep-awake self-ping for: ${url}`);
  // Ping every 14 minutes (14 * 60 * 1000 ms)
  setInterval(() => {
    https.get(url, (res) => {
      console.log(`Self-ping keep-awake response: ${res.statusCode}`);
    }).on('error', (err) => {
      console.error('Self-ping keep-awake error:', err.message);
    });
  }, 14 * 60 * 1000);
};
pingSelf();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
