import { Router } from 'express';
import { saveReport } from '../services/roomService.js';
const router = Router();
router.post('/report', async (req, res, next) => {
  try {
    const { roomId, reporterId } = req.body;
    if (!roomId) return res.status(400).json({ error: 'roomId required' });
    await saveReport(roomId, reporterId);
    res.json({ success: true });
  } catch (err) { next(err); }
});
export default router;