import { router } from 'expo-router';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

// Components
import { Image, Text, ProfileSkeleton } from '@/components';
import { EditIcon, LogoutIcon } from '@/components/icons';

// Themes
import { colors, colorTheme, fontsFamily, fontWeights } from '@/themes';

// Hooks
import { useAuthStore, useCartStore } from '@/stores';

// Constants
import { ROUTES } from '@/constants';

// Hooks
import { useColorScheme, useGetUser } from '@/hooks';

export const Setting = () => {
  const colorScheme = useColorScheme();

  const clearAuth = useAuthStore((state) => state.clearAuth);
  const clearCart = useCartStore((state) => state.clearCart);
  const userId = useAuthStore((state) => state.userId);

  const { user, isFetching } = useGetUser(userId);
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.block} />
        <Text size="lg" style={styles.heading}>
          Profile
        </Text>
        <TouchableOpacity onPress={logout}>
          <LogoutIcon color={colorTheme[colorScheme].default} />
        </TouchableOpacity>
      </View>

      {isFetching ? (
        <ProfileSkeleton />
      ) : (
        <View style={styles.infoWrapper}>
          <View style={styles.info}>
            <Image
              source={
                !!avatar
                  ? { uri: avatar }
                  : require('@/assets/images/avatar-default.jpg')
              }
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
            <EditIcon color={colorTheme[colorScheme].default} />
          </TouchableOpacity>
        </View>
      )}
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
    marginTop: 12,
    marginBottom: 20,
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
});
