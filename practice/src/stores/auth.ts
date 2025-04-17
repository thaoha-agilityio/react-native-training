import {createWithEqualityFn} from 'zustand/traditional';
import * as Keychain from 'react-native-keychain';
import {KEYCHAIN_SERVICE} from '@/constants';

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string;
  userId: string;
}

interface AuthStore extends AuthState {
  setAuthenticated: (isAuthenticated: boolean) => void;
  setAccessToken: (accessToken: string, userId: string) => Promise<void>;
  loadAccessTokenFromKeychain: () => Promise<void>;
  clearAuth: () => Promise<void>;
}

const INITIAL_AUTH_STATE: AuthState = {
  isAuthenticated: false,
  accessToken: '',
  userId: '',
};

export const useAuthStore = createWithEqualityFn<AuthStore>(set => ({
  ...INITIAL_AUTH_STATE,

  setAuthenticated: isAuthenticated => {
    set({isAuthenticated});
  },

  setAccessToken: async (accessToken: string, userId: string) => {
    // Save to Keychain securely
    await Keychain.setGenericPassword(
      'auth',
      JSON.stringify({accessToken, userId}),
      {
        service: KEYCHAIN_SERVICE,
      },
    );

    set({accessToken, isAuthenticated: true, userId});
  },

  loadAccessTokenFromKeychain: async () => {
    const credentials = await Keychain.getGenericPassword({
      service: KEYCHAIN_SERVICE,
    });

    if (credentials) {
      const data = JSON.parse(credentials.password);

      set({
        accessToken: data.accessToken,
        isAuthenticated: true,
        userId: data.userId,
      });
    }
  },

  clearAuth: async () => {
    await Keychain.resetGenericPassword({service: KEYCHAIN_SERVICE});
    set({...INITIAL_AUTH_STATE});
  },
}));
