import { createIntent, getActiveIntents } from '../services/feedService.js';
import { checkContent } from '../services/moderationService.js';
import { EVENTS } from '../../packages/shared/constants.js';
import { logger } from '../utils/logger.js';

export function registerFeedHandlers(io, socket) {
  // Send current feed on connect
  getActiveIntents().then(intents => {
    socket.emit(EVENTS.FEED_INITIAL, { intents });
  });

  socket.on(EVENTS.FEED_POST, async ({ text, vibe, category, anonId, userId }) => {
    try {
      const check = await checkContent(text);
      if (!check.safe) {
        socket.emit('error', { message: `Post blocked: ${check.reason}` });
        return;
      }
      const intent = await createIntent({ text, vibe, category, anonId, userId, socketId: socket.id });
      io.emit(EVENTS.FEED_NEW, {
        _id: intent._id, text, vibe, category, anonId, userId,
        createdAt: intent.createdAt,
      });
      logger.info(`New intent by ${anonId}: "${text.substring(0,40)}"`);
    } catch (err) {
      logger.error('feedPost error:', err.message);
    }
  });
}
