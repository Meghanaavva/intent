import DMThread from '../models/DMThread.js';
import DMMessage from '../models/DMMessage.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

function sortPair(a, b) {
  return [a, b].map(String).sort();
}

export async function getOrCreateThread(userIdA, userIdB) {
  if (userIdA === userIdB) {
    throw Object.assign(new Error("Can't message yourself"), { status: 400 });
  }
  const participants = sortPair(userIdA, userIdB);

  let thread = await DMThread.findOne({ participants: { $all: participants, $size: 2 } });
  if (!thread) {
    thread = await DMThread.create({ participants });
  }
  return thread;
}

export async function sendMessage({ threadId, senderId, text }) {
  const thread = await DMThread.findById(threadId);
  if (!thread) throw Object.assign(new Error('Thread not found'), { status: 404 });
  if (!thread.participants.map(String).includes(senderId)) {
    throw Object.assign(new Error('Not authorized'), { status: 403 });
  }

  const message = await DMMessage.create({ thread: threadId, sender: senderId, text });

  thread.lastMessage = text;
  thread.lastMessageAt = message.createdAt;
  await thread.save();

  return message;
}

export async function getMessages(threadId, userId) {
  const thread = await DMThread.findById(threadId);
  if (!thread) throw Object.assign(new Error('Thread not found'), { status: 404 });
  if (!thread.participants.map(String).includes(userId)) {
    throw Object.assign(new Error('Not authorized'), { status: 403 });
  }

  const messages = await DMMessage.find({ thread: threadId })
    .sort({ createdAt: 1 })
    .lean();

  await DMMessage.updateMany(
    { thread: threadId, sender: { $ne: userId }, read: false },
    { read: true }
  );

  return messages.map(m => ({
    id: m._id,
    sender: m.sender.toString(),
    text: m.text,
    createdAt: m.createdAt,
  }));
}

export async function getTotalUnreadCount(userId) {
  const threads = await DMThread.find({ participants: userId }).select('_id').lean();
  if (threads.length === 0) return 0;
  return DMMessage.countDocuments({
    thread: { $in: threads.map(t => t._id) },
    sender: { $ne: new mongoose.Types.ObjectId(userId) },
    read: false,
  });
}

export async function getThreadsForUser(userId) {
  const threads = await DMThread.find({ participants: userId })
    .sort({ lastMessageAt: -1 })
    .lean();

  const otherIds = threads.map(t =>
    t.participants.find(p => p.toString() !== userId)
  );
  const others = await User.find({ _id: { $in: otherIds } }).lean();
  const otherMap = Object.fromEntries(others.map(u => [u._id.toString(), u]));

  const unreadCounts = await DMMessage.aggregate([
    { $match: {
        thread: { $in: threads.map(t => t._id) },
        sender: { $ne: new mongoose.Types.ObjectId(userId) },
        read: false,
      }
    },
    { $group: { _id: '$thread', count: { $sum: 1 } } },
  ]);
  const unreadMap = Object.fromEntries(unreadCounts.map(u => [u._id.toString(), u.count]));


  return threads.map(t => {
    const otherId = t.participants.find(p => p.toString() !== userId).toString();
    const other = otherMap[otherId];
    return {
      threadId: t._id,
      otherUser: other ? { id: other._id, username: other.username, anonId: other.anonId } : null,
      lastMessage: t.lastMessage,
      lastMessageAt: t.lastMessageAt,
      unreadCount: unreadMap[t._id.toString()] || 0,
    };
  });
}