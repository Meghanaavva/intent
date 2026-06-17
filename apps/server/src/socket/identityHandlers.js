import { registerUserSocket, unregisterSocket } from '../utils/userSocketRegistry.js';
import { getActiveIntents } from '../services/feedService.js';
import { EVENTS } from '../../../packages/shared/constants.js';

export function registerIdentityHandlers(io, socket) {
  socket.on('identity:register', async ({ userId }) => {
    if (userId) {
      registerUserSocket(userId, socket.id);
      // Re-send the current feed so the client is always in sync
      // (avoids race between global socket connect and AppPage listener mount)
      try {
        const intents = await getActiveIntents();
        socket.emit(EVENTS.FEED_INITIAL, { intents });
      } catch {}
    }
  });

  socket.on('disconnect', () => {
    unregisterSocket(socket.id);
  });
}