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

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/milestones', milestoneRoutes);
app.use('/api/milestones/:milestoneId/tips', tipRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));