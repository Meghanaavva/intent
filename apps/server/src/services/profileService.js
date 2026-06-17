import User from '../models/User.js';
import Intent from '../models/Intent.js';
import Reaction from '../models/Reaction.js';

export async function getProfileStats(userId) {
  const user = await User.findById(userId);
  if (!user) throw Object.assign(new Error('User not found'), { status: 404 });

  const [postsCount, reactionsReceived, reactionsGiven] = await Promise.all([
    Intent.countDocuments({ userId }),
    Reaction.countDocuments({ toUser: userId }),
    Reaction.countDocuments({ fromUser: userId }),
  ]);

  return {
    user: { id: user._id.toString(), email: user.email, username: user.username, anonId: user.anonId, createdAt: user.createdAt },
    stats: { postsCount, reactionsReceived, reactionsGiven },
  };
}