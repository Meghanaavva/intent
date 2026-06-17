import { create } from 'zustand';
export const useUiStore = create((set) => ({
  appOpen: false,
  onlineCount: 54,
  toast: null,
  openApp: () => set({ appOpen: true }),
  closeApp: () => set({ appOpen: false }),
  setOnlineCount: (n) => set({ onlineCount: n }),
  showToast: (msg) => { set({ toast: msg }); setTimeout(() => set({ toast: null }), 3000); },
}));