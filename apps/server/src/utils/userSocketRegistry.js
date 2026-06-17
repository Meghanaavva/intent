const userSockets = new Map();

export function registerUserSocket(userId, socketId) {
  if (!userSockets.has(userId)) userSockets.set(userId, new Set());
  userSockets.get(userId).add(socketId);
}

export function unregisterSocket(socketId) {
  for (const [userId, set] of userSockets.entries()) {
    set.delete(socketId);
    if (set.size === 0) userSockets.delete(userId);
  }
}

export function getSocketIdsForUser(userId) {
  return Array.from(userSockets.get(userId) || []);
}
