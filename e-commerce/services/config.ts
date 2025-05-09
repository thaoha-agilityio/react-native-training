import axios from 'axios';

// Constants
import { API_BASE_URL } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  headers: { 'Content-Type': 'application/json' },
});
const getCurrentAccessToken = () => useAuthStore.getState().accessToken;

instance.interceptors.request.use((config) => {
  const token = getCurrentAccessToken();

  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

export default instance;
