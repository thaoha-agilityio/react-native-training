import * as SecureStore from 'expo-secure-store';
import { createWithEqualityFn } from 'zustand/traditional';

// Store
import { KEYCHAIN_SERVICE } from '@/constants';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  userId: string;
}

interface AuthStore extends AuthState {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setAccessToken: (accessToken: string, userId: string) => Promise<void>;
  loadAccessTokenFromStorage: () => Promise<void>;
  clearAuth: () => Promise<void>;
}

const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  accessToken: '',
  userId: '',
};

export const useAuthStore = createWithEqualityFn<AuthStore>((set) => ({
  ...INITIAL_AUTH_STATE,

  setAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },

  setAccessToken: async (accessToken, userId) => {
    const data = JSON.stringify({ accessToken, userId });
    await SecureStore.setItemAsync(KEYCHAIN_SERVICE, data);
    set({ accessToken, userId, isAuthenticated: true });
  },

  loadAccessTokenFromStorage: async () => {
    const result = await SecureStore.getItemAsync(KEYCHAIN_SERVICE);

    if (result) {
      const { accessToken, userId } = JSON.parse(result);
      set({ accessToken, userId, isAuthenticated: true });
    }
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync(KEYCHAIN_SERVICE);
    set({ ...INITIAL_AUTH_STATE });
  },
}));
