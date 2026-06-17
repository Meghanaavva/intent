import Redis from 'ioredis';
import { ENV } from './env.js';
export const redis = new Redis(ENV.REDIS_URL, {
  maxRetriesPerRequest: 3,
  lazyConnect: true,
});
redis.on('connect', () => console.log('✅ Redis connected'));
redis.on('error', (err) => console.error('❌ Redis error:', err.message));
export default redis;