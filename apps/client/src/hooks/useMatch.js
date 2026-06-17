import { socket } from '../lib/socket.js';
import { useRoomStore } from '../store/roomStore.js';
import { useIdentityStore } from '../store/identityStore.js';
import { EVENTS } from '../lib/constants.js';

export function useMatch() {
  const { setStatus, setMatchedIntent } = useRoomStore();
  const { anonId } = useIdentityStore();

  function joinIntent(intent) {
    setStatus('matching');
    setMatchedIntent(intent);
    socket.emit(EVENTS.MATCH_JOIN, {
      intentId: intent._id,
      anonId,
      posterSocketId: intent.socketId,
    });
  }
  return { joinIntent };
}