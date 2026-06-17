import { io } from 'socket.io-client';
const URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:8080';
export const socket = io(URL, { autoConnect: false, reconnection: true, reconnectionDelay: 1000 });