import Room from '../models/Room.js';
import Report from '../models/Report.js';
import { closeRoom } from './matchService.js';

export async function createRoom(roomId, intentId, users) {
  await Room.create({ roomId, intentId, users, active: true });
}
export async function deactivateRoom(roomId) {
  await Room.findOneAndUpdate({ roomId }, { active: false });
  await closeRoom(roomId);
}
export async function saveReport(roomId, reporterId) {
  await Report.create({ roomId, reporterId });
  await deactivateRoom(roomId);
}