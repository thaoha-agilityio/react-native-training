import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useShallow } from 'zustand/shallow';

// Components
import { Button, CartList, Text } from '@/components';
import { LocationIcon, PositionIcon } from '@/components/icons';

// Themes
import { fontsFamily, lineHeights } from '@/themes';

// Utils
import { formatPrice, formatUSPhoneNumber } from '@/utils';

// Stores
import { useAuthStore, useCartStore } from '@/stores';

// Hooks
import { useGetUser, useTheme } from '@/hooks';

// Constants
import { ROUTES } from '@/constants';

export const CartScreen = () => {
  const [cart, updateQuantity, removeCart, getTotalPrice] = useCartStore(
    useShallow((state) => [
      state.cart,
      state.updateQuantity,
      state.removeCart,
      state.getTotalPrice,
    ]),
  );
  const userId = useAuthStore((state) => state.userId);

  const { user } = useGetUser(userId);

  const { address = '', phoneNumber = '' } = user || {};

  const hasAddress = !!address && !!phoneNumber;

  const { colors } = useTheme();

  const navigateEditProfile = () => {
    router.push(ROUTES.EDIT_PROFILE);
  };

  const navigateCheckout = () => {
    router.push(ROUTES.CHECKOUT);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.content }]}>
      <View style={styles.addressWrapper}>
        <View style={styles.address}>
          <PositionIcon color={colors.default} />
          <Text size="sm" style={styles.delivery}>
            Delivery Address
          </Text>
        </View>
        {hasAddress ? (
          <View style={styles.infoAddress}>
            <View style={{ gap: 8 }}>
              <Text variant="label" numberOfLines={2} size="xs">
                Address :<Text size="xs"> {address}</Text>
              </Text>
              <Text variant="label" size="xs">
                Contact:
                <Text size="xs"> {formatUSPhoneNumber(phoneNumber)}</Text>
              </Text>
            </View>
            <TouchableOpacity onPress={navigateEditProfile}>
              <LocationIcon />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.infoAddress}>
            <Button
              title="+ Add new address"
              variant="link"
              onPress={navigateEditProfile}
            />
          </View>
        )}

        <Text variant="label" size="sm">
          Shopping List
        </Text>
      </View>
      <View style={[styles.items]}>
        <CartList
          data={cart}
          onRemove={removeCart}
          onChangeQuantity={updateQuantity}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.totalWrapper}>
          <Text size="lg" variant="label">
            Total:
          </Text>
          <Text size="lg" variant="label">
            ${formatPrice(getTotalPrice())}
          </Text>
        </View>
        <Button
          disabled={!cart.length || !hasAddress}
          title="Check out"
          style={styles.checkOutButton}
          onPress={navigateCheckout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 22,
  },

  addressWrapper: {
    paddingVertical: 18,
    paddingHorizontal: 22,
  },

  address: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  infoAddress: {
    boxShadow: '#8A959E1F 1px 1px 2px 2px',
    borderRadius: 6,
    padding: 12,
    marginTop: 10,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
  },

  title: {
    lineHeight: lineHeights.sm,
  },

  delivery: {
    fontFamily: fontsFamily.semiBold,
  },

  items: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 22,
  },

  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  checkOutButton: {
    height: 52,
  },

  footer: {
    paddingHorizontal: 22,
    paddingTop: 40,
    justifyContent: 'flex-end',
  },
});
