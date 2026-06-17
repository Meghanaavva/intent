import mongoose from 'mongoose';

const dmMessageSchema = new mongoose.Schema({
  thread:    { type: mongoose.Schema.Types.ObjectId, ref: 'DMThread', required: true },
  sender:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text:      { type: String, required: true, maxlength: 1000 },
  read:      { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

dmMessageSchema.index({ thread: 1, createdAt: 1 });

export default mongoose.model('DMMessage', dmMessageSchema);