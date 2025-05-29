import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { memo, useCallback, useMemo } from 'react';
import {
  router,
  NativeStackHeaderProps,
  BottomTabHeaderProps,
} from 'expo-router';

// Components
import { ArrowLeftIcon, LogoutIcon } from '../icons';
import { Text } from '../Text';
import { ShoppingCart } from '../ShoppingCart';

// Themes
import { colors, fontsFamily } from '@/themes';

// Hooks
import { useTheme } from '@/hooks';

// Constants
import { ROUTES, SCREENS } from '@/constants';

// Stores
import { useAuthStore, useCartStore } from '@/stores';

const HeaderComponent = ({
  route: { name },
  navigation,
}: NativeStackHeaderProps | BottomTabHeaderProps) => {
  const { colors } = useTheme();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const clearCart = useCartStore((state) => state.clearCart);

  const handleNavigationCart = useCallback(() => {
    navigation.push(SCREENS.CART);
  }, [navigation]);

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleLogout = useCallback(() => {
    clearAuth();
    clearCart();
    router.replace(ROUTES.LOGIN);
  }, [clearAuth, clearCart]);

  const {
    title,
    DynamicIcon,
    isBorder,
    LeftIcon,
    onPressLeftIcon,
    RightIcon,
    onPressRightIcon,
  } = useMemo(() => {
    switch (name) {
      case SCREENS.EDIT_PROFILE:
        return {
          title: 'Edit Profile',
          isBorder: true,
          LeftIcon: ArrowLeftIcon,
          onPressLeftIcon: handleGoBack,
        };

      case SCREENS.PRODUCT_DETAILS:
        return {
          title: '',
          isBorder: false,
          LeftIcon: ArrowLeftIcon,
          onPressLeftIcon: handleGoBack,
          DynamicIcon: ShoppingCart,
        };

      case SCREENS.CART:
        return {
          title: 'Cart',
          isBorder: true,
          LeftIcon: ArrowLeftIcon,
          onPressLeftIcon: handleGoBack,
        };

      case SCREENS.CHECKOUT:
        return {
          title: 'Checkout',
          isBorder: true,
          LeftIcon: ArrowLeftIcon,
          onPressLeftIcon: handleGoBack,
        };

      case SCREENS.SETTING:
        return {
          title: 'Setting',
          isBorder: false,
          RightIcon: LogoutIcon,
          onPressRightIcon: handleLogout,
        };

      default:
        return {
          title: '',
          DynamicIcon: null,
          RightIcon: null,
          LeftIcon: null,
        };
    }
  }, [name, handleGoBack, handleLogout]);

  return (
    <View
      style={[
        styles.headingWrapper,
        isBorder && { borderBottomWidth: 0.6 },
        { backgroundColor: colors.content },
      ]}
    >
      {!!LeftIcon ? (
        <TouchableOpacity onPress={onPressLeftIcon}>
          <LeftIcon color={colors.default} />
        </TouchableOpacity>
      ) : (
        <View style={styles.block} />
      )}

      <Text variant="title" size="lg" style={styles.heading}>
        {title}
      </Text>

      {!!RightIcon ? (
        <TouchableOpacity onPress={onPressRightIcon}>
          <RightIcon color={colors.default} />
        </TouchableOpacity>
      ) : (
        <View style={styles.block} />
      )}
      {!!DynamicIcon && <DynamicIcon onNavigation={handleNavigationCart} />}
    </View>
  );
};

export const Header = memo(HeaderComponent);

const styles = StyleSheet.create({
  headingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    borderColor: colors.border,
    paddingBottom: 18,
    paddingTop: 22,
  },

  heading: {
    textAlign: 'center',
    fontFamily: fontsFamily.semiBold,
  },

  block: {
    width: 20,
  },
});
