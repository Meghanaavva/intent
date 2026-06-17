import mongoose from 'mongoose';
const reportSchema = new mongoose.Schema({
  roomId:     { type: String, required: true },
  reporterId: { type: String },
  reason:     { type: String, default: 'user_report' },
  createdAt:  { type: Date, default: Date.now },
});
export default mongoose.model('Report', reportSchema);
