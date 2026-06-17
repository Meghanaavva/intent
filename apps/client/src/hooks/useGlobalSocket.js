import { useEffect } from 'react';
import { socket } from '../lib/socket.js';
import { useAuthStore } from '../store/authStore.js';

export function useGlobalSocket() {
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      if (socket.connected) socket.disconnect();
      return;
    }

    if (!socket.connected) socket.connect();

    function register() {
      socket.emit('identity:register', { userId: user.id });
    }
    register();
    socket.on('connect', register);

    return () => socket.off('connect', register);
  }, [user, loading]);
}
