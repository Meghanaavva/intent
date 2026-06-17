import { create } from 'zustand';

export const useFeedStore = create((set) => ({
  intents: [],
  category: 'all',
  setIntents: (intents) => set({ intents }),
  addIntent: (intent) => set((s) => {
    if (s.intents.some(i => i._id === intent._id)) return {}; // already present, skip
    return { intents: [intent, ...s.intents].slice(0, 80) };
  }),
  removeIntent: (id) => set((s) => ({ intents: s.intents.filter(i => i._id !== id) })),
  setCategory: (category) => set({ category }),
  markMatched: (id) => set((s) => ({ intents: s.intents.filter(i => i._id !== id) })),
}));