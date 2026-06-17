import mongoose from 'mongoose';

const dmThreadSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  lastMessage:  { type: String, default: '' },
  lastMessageAt:{ type: Date, default: Date.now },
  createdAt:    { type: Date, default: Date.now },
});

dmThreadSchema.index({ participants: 1 });

export default mongoose.model('DMThread', dmThreadSchema);