import { userJoined, userLeft, getOnlineCount } from '../services/presenceService.js';
import { EVENTS } from '../../../packages/shared/constants.js';

export function registerPresenceHandlers(io, socket) {
  userJoined(socket.id);
  broadcastPresence(io);

  socket.on(EVENTS.PRESENCE_PING, async () => {
    const count = await getOnlineCount();
    socket.emit(EVENTS.PRESENCE_UPDATE, { count });
  });

  socket.on('disconnect', async () => {
    await userLeft(socket.id);
    broadcastPresence(io);
  });
}

async function broadcastPresence(io) {
  const count = await getOnlineCount();
  io.emit(EVENTS.PRESENCE_UPDATE, { count });
}