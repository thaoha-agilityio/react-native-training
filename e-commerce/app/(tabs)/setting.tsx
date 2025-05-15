import { router } from 'expo-router';
import { View } from 'react-native';

// Components
import { Button } from '@/components';

// Constants
import { ROUTES } from '@/constants';

// Stores
import { useAuthStore, useCartStore } from '@/stores';

const SettingScreen = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearCart = useCartStore((state) => state.clearCart);

  const logout = () => {
    clearAuth();
    clearCart();
    router.push(ROUTES.LOGIN);
  };

  const navigateProfile = () => {
    router.push(ROUTES.EDIT_PROFILE);
  };

  return (
    <View>
      <Button title="logout" onPress={logout} />
      <Button
        title="edit profile"
        variant="outline"
        onPress={navigateProfile}
      />
    </View>
  );
};

export default SettingScreen;
