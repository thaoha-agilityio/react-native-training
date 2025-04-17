import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useShallow} from 'zustand/shallow';

// Components
import {FastImage, Text} from '@/components';
import {EditIcon, LogoutIcon, SearchIcon} from '@/components/icons';

// Stores
import {useAuthStore, useCartStore} from '@/stores';

// Themes
import {colors, fontWeights} from '@/themes';

// Types
import {AppStackScreenProps} from '@/interfaces';

// Constants
import {AVATAR_DEFAULT, SCREENS} from '@/constants';

// Hooks
import {useGetUser} from '@/hooks';

type ProfileScreenProps = AppStackScreenProps<typeof SCREENS.PROFILE>;

export const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const [clearAuth, userId] = useAuthStore(
    useShallow(state => [state.clearAuth, state.userId]),
  );

  const clearCart = useCartStore(state => state.clearCart);

  const handleLogout = () => {
    clearAuth();
    clearCart();
  };

  const handleNavigateEditProfile = () => {
    navigation.navigate(SCREENS.EDIT_PROFILE);
  };

  const {user: userDetails, isLoading} = useGetUser(userId);

  const {username, email, avatar} = userDetails || {};

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SearchIcon />
        <Text variant="heading" size="sm" style={styles.heading}>
          Profile
        </Text>
        <TouchableOpacity onPress={handleLogout}>
          <LogoutIcon />
        </TouchableOpacity>
      </View>

      <View style={styles.infoWrapper}>
        <View style={styles.info}>
          <FastImage
            uri={avatar}
            fallbackImage={AVATAR_DEFAULT}
            style={styles.img}
          />
          <View>
            <Text size="lg">{username}</Text>
            <Text variant="description" size="base">
              {email}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleNavigateEditProfile}>
          <EditIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingTop: Platform.OS === 'ios' ? 45 : 15,
    paddingHorizontal: 24,
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
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
