import { io } from 'socket.io-client';
const URL = import.meta.env.VITE_SERVER_URL || 'https://intent-production-f30f.up.railway.app';
export const socket = io(URL, { autoConnect: false, reconnection: true, reconnectionDelay: 1000 });