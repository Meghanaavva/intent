import mongoose from 'mongoose';
const roomSchema = new mongoose.Schema({
  roomId:    { type: String, required: true, unique: true },
  users:     [{ anonId: String, socketId: String }],
  intentId:  { type: String },
  active:    { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' },
});
export default mongoose.model('Room', roomSchema);