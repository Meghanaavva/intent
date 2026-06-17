import redis from '../config/redis.js';
const PRESENCE_KEY = 'presence:online';

export async function userJoined(socketId) {
  await redis.sadd(PRESENCE_KEY, socketId);
}
export async function userLeft(socketId) {
  await redis.srem(PRESENCE_KEY, socketId);
}
export async function getOnlineCount() {
  return redis.scard(PRESENCE_KEY);
}