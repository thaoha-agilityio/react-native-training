import { router } from 'expo-router';

// Components
import { Button } from '@/components';

// Constants
import { ROUTES } from '@/constants';

// Stores
import { useAuthStore } from '@/stores';
import { View } from 'react-native';

const SettingScreen = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const logout = () => {
    clearAuth();
    router.push(ROUTES.LOGIN);
  };

  const navigateProfile = () => {
    router.push(ROUTES.EDIT_PROFILE);
  };

  return (
    <View>
      <Button title="logout" onPress={logout} />
      <Button title="edit profile" onPress={navigateProfile} />
    </View>
  );
};

export default SettingScreen;
