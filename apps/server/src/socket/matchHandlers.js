import { attemptMatch } from '../services/matchService.js';
import { EVENTS } from '../../../packages/shared/constants.js';
import { logger } from '../utils/logger.js';

// Map socketId -> { anonId, roomId }
const socketRoomMap = new Map();

export function registerMatchHandlers(io, socket) {
  socket.on(EVENTS.MATCH_JOIN, async ({ intentId, anonId, posterSocketId }) => {
    logger.info(`${anonId} attempting to join intent ${intentId}`);
    const result = await attemptMatch(intentId, socket.id, anonId);

    if (!result.success) {
      socket.emit(EVENTS.MATCH_FAILED, { reason: result.reason });
      return;
    }

    const { roomId } = result;
    socket.join(roomId);
    socketRoomMap.set(socket.id, { anonId, roomId });

    // Notify poster if still connected
    if (posterSocketId) {
      const posterSocket = io.sockets.sockets.get(posterSocketId);
      if (posterSocket) {
        posterSocket.join(roomId);
        socketRoomMap.set(posterSocketId, { anonId: 'poster', roomId });
      }
    }

    io.to(roomId).emit(EVENTS.MATCH_SUCCESS, { roomId, anonId });
    logger.info(`Room ${roomId} created — ${anonId} matched`);
  });

  socket.on('disconnect', () => {
    const data = socketRoomMap.get(socket.id);
    if (data?.roomId) {
      socket.to(data.roomId).emit(EVENTS.ROOM_PARTNER_LEFT);
      socketRoomMap.delete(socket.id);
    }
  });
}