import { useEffect, useState } from 'react';

// Stores
import { useAuthStore } from '@/stores';

export const useHydration = () => {
  const [hydratedAuthStore, setHydratedAuthStore] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      await useAuthStore.getState().loadAccessTokenFromStorage();
      setHydratedAuthStore(true);
    };

    loadAuthData();
  }, []);

  return hydratedAuthStore;
};
