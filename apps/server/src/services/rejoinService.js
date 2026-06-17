/**
 * server/src/services/rejoinService.js
 * Business logic for restoring users to active ephemeral rooms.
 */

import { Room } from '../models/Room.js';

export const rejoinService = {
  /**
   * verifyRejoinEligibility
   * Checks if a node signature has an active room record they should be in.
   */
  async verifyRejoinEligibility(nodeSignature) {
    // Look for any ACTIVE room where this node is a participant
    const activeRoom = await Room.findOne({
      'connectedNodes.nodeSignature': nodeSignature,
      status: 'ACTIVE'
    });

    return activeRoom;
  },

  /**
   * syncReconnection
   * Refreshes the socket-to-room binding and updates presence status.
   */
  async syncReconnection(roomId, nodeSignature) {
    // 1. Mark the user as online in the room
    const room = await Room.findOneAndUpdate(
      { _id: roomId, 'connectedNodes.nodeSignature': nodeSignature },
      { $set: { 'connectedNodes.$.isOnline': true } },
      { new: true }
    );

    // 2. Return the latest message state so the frontend can fill gaps
    return {
      roomId: room._id,
      messages: room.messages,
      category: room.category
    };
  }
};