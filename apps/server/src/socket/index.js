import { Server } from 'socket.io';
import { registerPresenceHandlers } from './presenceHandlers.js';
import { registerFeedHandlers } from './feedHandlers.js';
import { registerMatchHandlers } from './matchHandlers.js';
import { registerRoomHandlers } from './roomHandlers.js';
import { registerIdentityHandlers } from './identityHandlers.js';
import { ENV } from '../config/env.js';
import { logger } from '../utils/logger.js';

let ioInstance = null;

export function getIO() {
  return ioInstance;
}

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: ENV.CLIENT_URL, methods: ['GET','POST'] },
    pingTimeout: 60000,
    pingInterval: 25000,
  });
  ioInstance = io;

  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);
    registerPresenceHandlers(io, socket);
    registerFeedHandlers(io, socket);
    registerMatchHandlers(io, socket);
    registerRoomHandlers(io, socket);
    registerIdentityHandlers(io, socket);
    socket.on('disconnect', () => logger.info(`Socket disconnected: ${socket.id}`));
  });

  return io;
}
