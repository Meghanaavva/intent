import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getIO } from '../socket/index.js';
import { getSocketIdsForUser } from '../utils/userSocketRegistry.js';
import DMThread from '../models/DMThread.js';
import { getOrCreateThread, sendMessage, getMessages, getThreadsForUser, getTotalUnreadCount } from '../services/dmService.js';

const router = Router();

router.get('/unread-count', requireAuth, async (req, res, next) => {
  try {
    const count = await getTotalUnreadCount(req.userId);
    res.json({ count });
  } catch (err) { next(err); }
});

router.get('/threads', requireAuth, async (req, res, next) => {
  try {
    const threads = await getThreadsForUser(req.userId);
    res.json({ threads });
  } catch (err) { next(err); }
});

router.post('/threads/with/:userId', requireAuth, async (req, res, next) => {
  try {
    const thread = await getOrCreateThread(req.userId, req.params.userId);
    res.json({ threadId: thread._id });
  } catch (err) { next(err); }
});

router.get('/threads/:threadId/messages', requireAuth, async (req, res, next) => {
  try {
    const messages = await getMessages(req.params.threadId, req.userId);
    res.json({ messages });
  } catch (err) { next(err); }
});

router.post('/threads/:threadId/messages', requireAuth, async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) return res.status(400).json({ error: 'Message cannot be empty' });
    const message = await sendMessage({ threadId: req.params.threadId, senderId: req.userId, text: text.trim() });

    const thread = await DMThread.findById(req.params.threadId);
    const otherId = thread.participants.find(p => p.toString() !== req.userId)?.toString();
    if (otherId) {
      const io = getIO();
      for (const sid of getSocketIdsForUser(otherId)) {
        io.to(sid).emit('dm:message', {
          threadId: req.params.threadId,
          message: { id: message._id, sender: message.sender.toString(), text: message.text, createdAt: message.createdAt },
        });
      }
    }
    res.status(201).json({ message });
  } catch (err) { next(err); }
});

export default router;