import {
  Pressable,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { useShallow } from 'zustand/shallow';
import { useCallback } from 'react';

// Components
import { CartList, Text, Button } from '@/components';
import { ArrowLeftIcon, LocationIcon, PositionIcon } from '@/components/icons';

// Themes
import { colors, fontsFamily, lineHeights } from '@/themes';

// Utils
import { formatPrice, formatUSPhoneNumber } from '@/utils';

// Stores
import { useAuthStore, useCartStore } from '@/stores';

// Hooks
import { useGetUser } from '@/hooks';

// Constants
import { ROUTES } from '@/constants';

const screenHeight = Dimensions.get('window').height;

export const Cart = ({ isTabBar }: { isTabBar?: boolean }) => {
  const handleGoBack = () => {
    router.back();
  };

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

  const navigateEditProfile = () => {
    router.push(ROUTES.EDIT_PROFILE);
  };

  const navigateCheckout = () => {
    router.push(ROUTES.CHECKOUT);
  };

  const handleUpdateQuantity = useCallback(
    (id: string, quantity: number) => {
      updateQuantity(id, quantity);
    },
    [updateQuantity],
  );

  const handleRemoveCart = useCallback(
    (id: string) => {
      removeCart(id);
    },
    [removeCart],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingWrapper}>
        <Pressable onPress={handleGoBack}>
          <ArrowLeftIcon />
        </Pressable>
        <Text size="lg" style={styles.heading}>
          Cart
        </Text>
        <View style={styles.block} />
      </View>

      <View style={styles.addressWrapper}>
        <View style={styles.address}>
          <PositionIcon />
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

        <View
          style={[
            styles.items,
            { height: isTabBar ? screenHeight * 0.4 : screenHeight * 0.5 },
          ]}
        >
          <CartList
            data={cart}
            onRemove={handleRemoveCart}
            onChangeQuantity={handleUpdateQuantity}
          />
        </View>
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

  headingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    borderColor: colors.border,
    borderBottomWidth: 0.6,
    paddingBottom: 18,
  },

  heading: {
    textAlign: 'center',
    fontFamily: fontsFamily.semiBold,
  },

  block: {
    width: 20,
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
    marginTop: 10,
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
    flex: 1,
    justifyContent: 'flex-end',
  },

  addNewAddress: {},
});
