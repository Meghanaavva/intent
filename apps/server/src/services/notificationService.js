import Reaction from '../models/Reaction.js';
import Notification from '../models/Notification.js';
import Intent from '../models/Intent.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

function assertValidId(id, label = 'id') {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw Object.assign(new Error(`Invalid ${label}`), { status: 400 });
  }
}

export async function reactToIntent({ intentId, fromUserId }) {
  assertValidId(intentId, 'intentId');
  const intent = await Intent.findById(intentId);
  // ...rest unchanged
}

export async function getReactionsForIntent(intentId, ownerId) {
  assertValidId(intentId, 'intentId');
  const intent = await Intent.findById(intentId);
  // ...rest unchanged
}

export async function getNotifications(userId) {
  assertValidId(userId, 'userId');

  return await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .lean();
}

export async function markNotificationsRead(userId) {
  assertValidId(userId, 'userId');

  await Notification.updateMany(
    { user: userId, read: false },
    { $set: { read: true } }
  );

  return true;
}

export async function getUnreadCount(userId) {
  assertValidId(userId, 'userId');

  return await Notification.countDocuments({
    user: userId,
    read: false,
  });
}