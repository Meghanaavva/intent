import { create } from 'zustand';
import { generateId } from '../lib/identity.js';
export const useIdentityStore = create((set) => ({
  anonId: generateId(),
  reset: () => set({ anonId: generateId() }),
  setAnonId: (anonId) => set({ anonId }),
}));