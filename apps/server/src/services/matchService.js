import redis from '../config/redis.js';
import { acquireLock, releaseLock } from '../utils/atomicLock.js';
import { markMatched } from './feedService.js';
import { v4 as uuid } from 'uuid';

export async function attemptMatch(intentId, joinerSocketId, joinerAnonId) {
  const lockKey = `match:${intentId}`;
  const locked  = await acquireLock(lockKey, 10);
  if (!locked) return { success: false, reason: 'already_matched' };

  try {
    const already = await redis.get(`matched:${intentId}`);
    if (already) return { success: false, reason: 'already_matched' };

    const roomId = uuid();
    await redis.setex(`matched:${intentId}`, 10800, roomId);
    await redis.setex(`room:${roomId}`, 10800, JSON.stringify({
      roomId, intentId, users: [joinerAnonId], createdAt: Date.now()
    }));
    await markMatched(intentId);
    return { success: true, roomId };
  } finally {
    await releaseLock(lockKey);
  }
}

export async function getRoomData(roomId) {
  const data = await redis.get(`room:${roomId}`);
  return data ? JSON.parse(data) : null;
}

export async function closeRoom(roomId) {
  await redis.del(`room:${roomId}`);
}