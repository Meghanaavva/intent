import Intent from '../models/Intent.js';
import redis from '../config/redis.js';
import { logger } from '../utils/logger.js';

export async function createIntent({ text, vibe, category, anonId, userId, socketId }) {
  const intent = await Intent.create({ text, vibe, category, anonId, userId, socketId });
  await redis.setex(`intent:${intent._id}`, 10800, JSON.stringify({ text, vibe, category, anonId }));
  return intent;
}

export async function getActiveIntents() {
  return Intent.find({ matched: false }).sort({ createdAt: -1 }).limit(50).lean();
}

export async function markMatched(intentId) {
  await Intent.findByIdAndUpdate(intentId, { matched: true });
  await redis.del(`intent:${intentId}`);
}

export async function deleteIntent(intentId) {
  await Intent.findByIdAndDelete(intentId);
  await redis.del(`intent:${intentId}`);
}