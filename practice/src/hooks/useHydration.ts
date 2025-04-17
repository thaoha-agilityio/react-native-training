import {useEffect, useState} from 'react';

// Stores
import {useAuthStore} from '@/stores';

export const useHydration = () => {
  const [hydratedAuthStore, setHydratedAuthStore] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      await useAuthStore.getState().loadAccessTokenFromKeychain();
      setHydratedAuthStore(true); // Set hydrated state to true once auth data is loaded
    };

    loadAuthData();
  }, []);

  return hydratedAuthStore;
};
