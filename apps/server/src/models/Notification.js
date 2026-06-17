import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fromUser:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type:      { type: String, enum: ['reaction'], default: 'reaction' },
  intentId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Intent' },
  intentText:{ type: String },
  read:      { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Notification', notificationSchema);
