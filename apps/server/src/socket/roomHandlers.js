import { deactivateRoom, saveReport } from '../services/roomService.js';
import { EVENTS } from '../../../packages/shared/constants.js';
import { logger } from '../utils/logger.js';

export function registerRoomHandlers(io, socket) {
  socket.on(EVENTS.ROOM_MESSAGE, ({ roomId, text, anonId, timestamp }) => {
    if (!roomId || !text) return;
    socket.to(roomId).emit(EVENTS.ROOM_MESSAGE, { text, anonId, timestamp });
  });

  socket.on(EVENTS.ROOM_LEAVE, async ({ roomId, anonId }) => {
    socket.to(roomId).emit(EVENTS.ROOM_PARTNER_LEFT);
    socket.leave(roomId);
    await deactivateRoom(roomId).catch(() => {});
    logger.info(`${anonId} left room ${roomId}`);
  });

  socket.on(EVENTS.ROOM_REPORT, async ({ roomId, reporterId }) => {
    await saveReport(roomId, reporterId).catch(() => {});
    io.to(roomId).emit(EVENTS.ROOM_CLOSED, { reason: 'reported' });
    logger.warn(`Room ${roomId} reported by ${reporterId}`);
  });
}