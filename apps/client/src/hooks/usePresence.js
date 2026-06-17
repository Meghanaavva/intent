import { useEffect } from 'react';
import { socket } from '../lib/socket.js';
import { EVENTS } from '../lib/constants.js';
export function usePresence() {
  useEffect(() => {
    const interval = setInterval(() => socket.emit(EVENTS.PRESENCE_PING), 15000);
    return () => clearInterval(interval);
  }, []);
}
