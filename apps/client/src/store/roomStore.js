import { create } from 'zustand';

export const useRoomStore = create((set) => ({
  roomId:        null,
  messages:      [],
  status:        'idle',
  // idle | matching | connecting | matched | connected | left | gone | reported | ended
  matchedIntent: null,

  setRoom: (roomId) => set({
    roomId,
    status:   'connected',
    messages: [],
  }),

  setStatus: (status) => set({ status }),

  addMessage: (msg) => set((s) => ({
    messages: [...s.messages, msg],
  })),

  setMatchedIntent: (intent) => set({ matchedIntent: intent }),

  reset: () => set({
    roomId:        null,
    messages:      [],
    status:        'idle',
    matchedIntent: null,
  }),
}));