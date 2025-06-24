import express from 'express';

import {
  createMilestone,
  deleteMilestone,
  getMilestones,
  updateMilestone,
} from '../controllers/milestoneController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();
router.use(auth);
router.post('/', createMilestone);
router.get('/', getMilestones);
router.put('/:id', updateMilestone);
router.delete('/:id', deleteMilestone);
export default router;