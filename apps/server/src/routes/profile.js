import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getProfileStats } from '../services/profileService.js';

const router = Router();

router.get('/stats', requireAuth, async (req, res, next) => {
  try {
    const result = await getProfileStats(req.userId);
    res.json(result);
  } catch (err) { next(err); }
});

export default router;
