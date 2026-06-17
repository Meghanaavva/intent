import { create } from 'zustand';
import { meApi, loginApi, signupApi } from '../lib/api.js';

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('intent_token') || null,
  loading: true,
  error: null,

  init: async () => {
    const token = localStorage.getItem('intent_token');
    if (!token) return set({ loading: false });
    try {
      const { user } = await meApi();
      set({ user, token, loading: false });
    } catch {
      localStorage.removeItem('intent_token');
      set({ user: null, token: null, loading: false });
    }
  },

  login: async (email, password) => {
    set({ error: null });
    try {
      const { token, user } = await loginApi({ email, password });
      localStorage.setItem('intent_token', token);
      set({ token, user });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.error || 'Login failed' });
      return false;
    }
  },

  signup: async (email, password, username) => {
    set({ error: null });
    try {
      await signupApi({ email, password, username });
      // Don't auto-login — redirect to login page so user signs in manually
      return 'signup_ok';
    } catch (err) {
      set({ error: err.response?.data?.error || 'Signup failed' });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('intent_token');
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),
}));