import { router } from 'expo-router';

// Components
import { Button } from '@/components';

// Constants
import { ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';

const SettingScreen = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const logout = () => {
    clearAuth();
    router.push(ROUTES.LOGIN);
  };

  return <Button title="logout" onPress={logout} />;
};

export default SettingScreen;
