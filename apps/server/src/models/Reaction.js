import mongoose from 'mongoose';

const reactionSchema = new mongoose.Schema({
  intentId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Intent', required: true },
  fromUser:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:      { type: String, enum: ['interested'], default: 'interested' },
  createdAt: { type: Date, default: Date.now },
});

reactionSchema.index({ intentId: 1, fromUser: 1 }, { unique: true });

export default mongoose.model('Reaction', reactionSchema);