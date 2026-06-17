import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getIO } from '../socket/index.js';
import { getSocketIdsForUser } from '../utils/userSocketRegistry.js';
import {
  reactToIntent,
  getReactionsForIntent,
  getNotifications,
  markNotificationsRead,
  getUnreadCount,
} from '../services/notificationService.js';

const router = Router();

router.post('/react/:intentId', requireAuth, async (req, res, next) => {
  try {
    const result = await reactToIntent({ intentId: req.params.intentId, fromUserId: req.userId });

    if (result.notification) {
      const io = getIO();
      const toUserId = result.notification.user.toString();
      for (const sid of getSocketIdsForUser(toUserId)) {
        io.to(sid).emit('notification:new', {
          id: result.notification._id,
          type: 'reaction',
          intentId: result.notification.intentId,
          intentText: result.notification.intentText,
          createdAt: result.notification.createdAt,
        });
      }
    }

    res.json(result);
  } catch (err) { next(err); }
});

router.get('/reactions/:intentId', requireAuth, async (req, res, next) => {
  try {
    const reactions = await getReactionsForIntent(req.params.intentId, req.userId);
    res.json({ reactions });
  } catch (err) { next(err); }
});

router.get('/', requireAuth, async (req, res, next) => {
  try {
    const notifications = await getNotifications(req.userId);
    res.json({ notifications });
  } catch (err) { next(err); }
});

router.get('/unread-count', requireAuth, async (req, res, next) => {
  try {
    const count = await getUnreadCount(req.userId);
    res.json({ count });
  } catch (err) { next(err); }
});

router.post('/mark-read', requireAuth, async (req, res, next) => {
  try {
    await markNotificationsRead(req.userId);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
