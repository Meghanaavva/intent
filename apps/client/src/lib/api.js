import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:4000';

export const api = axios.create({ baseURL: `${BASE_URL}/api` });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('intent_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signupApi  = (data) => api.post('/auth/signup', data).then(r => r.data);
export const loginApi   = (data) => api.post('/auth/login',  data).then(r => r.data);
export const meApi      = ()     => api.get('/auth/me').then(r => r.data);

export const reactToIntentApi        = (intentId) => api.post(`/notifications/react/${intentId}`).then(r => r.data);
export const getReactionsApi         = (intentId) => api.get(`/notifications/reactions/${intentId}`).then(r => r.data);
export const getNotificationsApi     = ()          => api.get('/notifications').then(r => r.data);
export const getUnreadCountApi       = ()          => api.get('/notifications/unread-count').then(r => r.data);
export const markNotificationsReadApi= ()          => api.post('/notifications/mark-read').then(r => r.data);

export const getThreadsApi           = ()          => api.get('/dm/threads').then(r => r.data);
export const getOrCreateThreadApi    = (userId)    => api.post(`/dm/threads/with/${userId}`).then(r => r.data);
export const getMessagesApi          = (threadId)  => api.get(`/dm/threads/${threadId}/messages`).then(r => r.data);
export const sendMessageApi          = (threadId, text) => api.post(`/dm/threads/${threadId}/messages`, { text }).then(r => r.data);
export const getUnreadDMCountApi     = ()          => api.get('/dm/unread-count').then(r => r.data);

export const getProfileStatsApi      = ()          => api.get('/profile/stats').then(r => r.data);

export const getFeedApi              = ()          => api.get('/feed').then(r => r.data);