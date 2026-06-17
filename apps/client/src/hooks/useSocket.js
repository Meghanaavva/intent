import { useEffect } from 'react';
import { socket } from '../lib/socket.js';
import { useUiStore } from '../store/uiStore.js';
import { useFeedStore } from '../store/feedStore.js';
import { useRoomStore } from '../store/roomStore.js';
import { EVENTS } from '../lib/constants.js';

export function useSocket() {
  const { setOnlineCount, showToast } = useUiStore();
  const { setIntents, addIntent, markMatched } = useFeedStore();
  const { setRoom, setStatus, addMessage } = useRoomStore();

  useEffect(() => {
    socket.on(EVENTS.PRESENCE_UPDATE, ({ count }) => setOnlineCount(count));
    socket.on(EVENTS.FEED_INITIAL, ({ intents }) => setIntents(intents));
    socket.on(EVENTS.FEED_NEW,     (intent)       => addIntent(intent));
    socket.on(EVENTS.FEED_EXPIRE,  ({ id })        => markMatched(id));

    socket.on(EVENTS.MATCH_SUCCESS, ({ roomId }) => {
      setStatus('connecting');
      setTimeout(() => {
        setStatus('matched');
        setTimeout(() => setRoom(roomId), 900);
      }, 900);
    });
    socket.on(EVENTS.MATCH_FAILED, ({ reason } = {}) => {
      setStatus('idle');
      showToast(reason === 'already_matched'
        ? 'This intent was just matched by someone else'
        : 'Could not connect — try another intent');
    });

    socket.on(EVENTS.ROOM_MESSAGE,      (msg) => addMessage({ ...msg, own: false }));
    socket.on(EVENTS.ROOM_PARTNER_LEFT, ()    => setStatus('gone'));
    socket.on(EVENTS.ROOM_CLOSED,       ()    => setStatus('reported'));

    return () => {
      socket.off(EVENTS.PRESENCE_UPDATE);
      socket.off(EVENTS.FEED_INITIAL);
      socket.off(EVENTS.FEED_NEW);
      socket.off(EVENTS.FEED_EXPIRE);
      socket.off(EVENTS.MATCH_SUCCESS);
      socket.off(EVENTS.MATCH_FAILED);
      socket.off(EVENTS.ROOM_MESSAGE);
      socket.off(EVENTS.ROOM_PARTNER_LEFT);
      socket.off(EVENTS.ROOM_CLOSED);
    };
  }, []);

  return socket;
}