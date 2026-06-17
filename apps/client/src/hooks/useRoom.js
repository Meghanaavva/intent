import { socket } from '../lib/socket.js';
import { useRoomStore } from '../store/roomStore.js';
import { useIdentityStore } from '../store/identityStore.js';
import { EVENTS } from '../lib/constants.js';

export function useRoom() {
  const { roomId, addMessage, setStatus, reset } = useRoomStore();
  const { anonId, reset: resetId } = useIdentityStore();

  function sendMessage(text) {
    if (!text.trim() || !roomId) return;
    const msg = { text, anonId, timestamp: Date.now(), own: true };
    addMessage(msg);
    socket.emit(EVENTS.ROOM_MESSAGE, { roomId, text, anonId, timestamp: msg.timestamp });
  }

  function leaveRoom() {
    socket.emit(EVENTS.ROOM_LEAVE, { roomId, anonId });
    setStatus('left');
    resetId();
  }

  function reportRoom() {
    socket.emit(EVENTS.ROOM_REPORT, { roomId, reporterId: anonId });
  }

  return { sendMessage, leaveRoom, reportRoom };
}