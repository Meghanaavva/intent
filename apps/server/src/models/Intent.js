import mongoose from 'mongoose';
const intentSchema = new mongoose.Schema({
  text:      { type: String, required: true, maxlength: 160 },
  vibe:      { type: String, enum: ['building','exploring','urgent','casual'], default: 'exploring' },
  category:  { type: String, default: 'all' },
  anonId:    { type: String, required: true },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  socketId:  { type: String },
  matched:   { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: '3h' },
});
export default mongoose.model('Intent', intentSchema);
