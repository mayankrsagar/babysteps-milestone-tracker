import express from 'express';

import {
  addTip,
  getTips,
} from '../controllers/tipController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });
router.use(auth);
router.post('/', addTip);
router.get('/', getTips);
export default router;