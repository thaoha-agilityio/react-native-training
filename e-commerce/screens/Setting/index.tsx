import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { Button, Image, ProfileSkeleton, Text } from '@/components';
import { EditIcon, LogoutIcon } from '@/components/icons';

// Themes
import { colors, fontsFamily, fontWeights } from '@/themes';

// Hooks
import { useAuthStore, useCartStore } from '@/stores';

// Constants
import { AVATAR_DEFAULT, ROUTES } from '@/constants';

// Hooks
import { useGetUser, useTheme } from '@/hooks';

export const Setting = () => {
  const { toggleTheme, colors } = useTheme();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearCart = useCartStore((state) => state.clearCart);

  const userId = useAuthStore((state) => state.userId);
  const { user, isLoading } = useGetUser(userId);
  const { username = '', email = '', avatar = '' } = user || {};

  const logout = () => {
    clearAuth();
    clearCart();
    router.push(ROUTES.LOGIN);
  };

  const navigateProfile = () => {
    router.push(ROUTES.EDIT_PROFILE);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.content }]}>
      <View style={styles.headerContainer}>
        <View style={styles.block} />
        <Text size="lg" style={styles.heading}>
          Setting
        </Text>
        <TouchableOpacity onPress={logout}>
          <LogoutIcon color={colors.default} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ProfileSkeleton />
      ) : (
        <View style={styles.infoWrapper}>
          <View style={styles.info}>
            <Image
              source={!!avatar ? { uri: avatar } : AVATAR_DEFAULT.source}
              alt={AVATAR_DEFAULT.alt}
              style={styles.img}
            />
            <View>
              <Text size="lg" variant="label">
                {username}
              </Text>
              <Text size="sm">{email}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={navigateProfile}>
            <EditIcon color={colors.default} />
          </TouchableOpacity>
        </View>
      )}
      <Button
        title="toggle theme"
        onPress={toggleTheme}
        style={styles.toggleTheme}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
  },

  logout: {
    width: 315,
    height: 60,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    textAlign: 'center',
    fontFamily: fontsFamily.semiBold,
  },

  infoWrapper: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },

  name: {
    fontWeight: fontWeights.bold,
    color: colors.text.primary,
  },

  block: {
    width: 20,
  },

  toggleTheme: {
    marginTop: 20,
    height: 50,
  },
});
