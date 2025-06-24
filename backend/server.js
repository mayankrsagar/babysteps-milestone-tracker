import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import milestoneRoutes from './routes/milestones.js';
import tipRoutes from './routes/tips.js';

dotenv.config();
const app = express();

// Connect DB
connectDB();

const allowedOrigins = [
  'https://babysteps-milestone-tracker.vercel.app',      // your production frontend
  'http://localhost:3000',                              // local dev frontend
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. curl, mobile)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS policy disallows access from ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/milestones/:milestoneId/tips', tipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));