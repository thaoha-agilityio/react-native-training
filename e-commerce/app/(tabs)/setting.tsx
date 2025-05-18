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
    <View style={{ gap: 20, padding: 10 }}>
      <Button title="Logout" onPress={logout} style={{ height: 50 }} />
      <Button
        title="Edit profile"
        variant="outline"
        style={{ height: 50 }}
        onPress={navigateProfile}
      />
    </View>
  );
};

export default SettingScreen;
