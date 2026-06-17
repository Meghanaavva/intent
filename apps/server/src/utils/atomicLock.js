import redis from '../config/redis.js';
export async function acquireLock(key, ttl = 10) {
  const result = await redis.set(`lock:${key}`, '1', 'NX', 'EX', ttl);
  return result === 'OK';
}
export async function releaseLock(key) {
  await redis.del(`lock:${key}`);
}