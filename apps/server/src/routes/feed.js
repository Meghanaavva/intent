import { Router } from 'express';
import { getActiveIntents } from '../services/feedService.js';
const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const intents = await getActiveIntents();
    res.json({ intents });
  } catch (err) { next(err); }
});
export default router;