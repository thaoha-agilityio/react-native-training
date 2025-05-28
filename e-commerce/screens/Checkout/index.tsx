import { router } from 'expo-router';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { useShallow } from 'zustand/shallow';

// Components
import { Button, SuccessModal, Text } from '@/components';
import { DeliveryIcon, EditIcon } from '@/components/icons';

// Hooks
import { useGetUser, useOrderCreated, useTheme } from '@/hooks';

// Stores
import { useAuthStore, useCartStore } from '@/stores';

// Themes
import {
  colors,
  fontSizes,
  fontWeights,
  fontsFamily,
  lineHeights,
} from '@/themes';

// Utils
import { formatPrice } from '@/utils';

// Constants
import { ROUTES } from '@/constants';

// Define shipping fee
const SHIPPING_FEE = 5;

export const CheckoutScreen = () => {
  const { colors: colorTheme } = useTheme();

  const [cart, getTotalPrice, clearCart] = useCartStore(
    useShallow((state) => [state.cart, state.getTotalPrice, state.clearCart]),
  );
  const userId = useAuthStore((state) => state.userId);
  const { mutate: createOrder, isPending } = useOrderCreated();
  const { user } = useGetUser(userId);

  const { address = '', bankAccountNumber, username = '' } = user || {};

  const [isVisible, setIsVisible] = useState(false);

  const totalOrderPrice = () => {
    const price = getTotalPrice();
    return price + SHIPPING_FEE;
  };

  const handleOrderCreate = () => {
    const payload = {
      userId: userId.toString(),
      shippingFee: SHIPPING_FEE,
      total: totalOrderPrice(),
      orderItems: cart,
    };

    createOrder(payload, {
      onSuccess: handleOrderCreateSuccess,
      onError: (error) => handleOrderCreateError(error.message),
    });
  };

  const handleOrderCreateSuccess = () => {
    setIsVisible(true);
    clearCart();
  };

  const handleOrderCreateError = (error: string) => {
    Toast.show({ type: 'error', text1: error });
  };

  const navigateToHome = useCallback(() => {
    router.push(ROUTES.HOME);
    setIsVisible(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colorTheme.content }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.infoWrapper}>
        {/*Address  */}
        <View style={styles.wrapper}>
          <View style={styles.title}>
            <Text size="md">Shipping Address</Text>
            <TouchableOpacity>
              <EditIcon />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.addressContent,
              { backgroundColor: colorTheme.background },
            ]}
          >
            <Text size="md" style={styles.name}>
              {username}
            </Text>
            <View style={styles.divider} />
            <Text variant="description" size="sm" style={styles.address}>
              {address}
            </Text>
          </View>
        </View>

        {/* Payment */}
        <View style={styles.wrapper}>
          <View style={styles.title}>
            <Text size="md">Payment</Text>
            <TouchableOpacity>
              <EditIcon />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.payment, { backgroundColor: colorTheme.background }]}
          >
            <Text size="sm">**** **** **** {bankAccountNumber}</Text>
          </View>
        </View>

        {/* Delivery method */}
        <View style={styles.wrapper}>
          <View style={styles.title}>
            <Text size="md">Delivery method</Text>
            <TouchableOpacity>
              <EditIcon />
            </TouchableOpacity>
          </View>
          <View
            style={[styles.payment, { backgroundColor: colorTheme.background }]}
          >
            <DeliveryIcon />
            <Text size="sm">Fast (2-3days)</Text>
          </View>
        </View>
        <View
          style={[
            styles.totalPayment,
            { backgroundColor: colorTheme.background },
          ]}
        >
          <View style={styles.priceWrapper}>
            <Text size="md" variant="description">
              Order:
            </Text>
            <Text size="md" style={styles.price}>
              $ {formatPrice(getTotalPrice())}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text size="md" variant="description">
              Delivery:
            </Text>
            <Text size="md" style={styles.price}>
              $ {SHIPPING_FEE}
            </Text>
          </View>
          <View style={styles.priceWrapper}>
            <Text size="md" variant="description">
              Total:
            </Text>
            <Text size="md" style={styles.price}>
              $ {formatPrice(totalOrderPrice())}
            </Text>
          </View>
        </View>

        <Button
          isLoading={isPending}
          style={styles.submitOrder}
          extraTextStyle={styles.textButton}
          title="submit order"
          onPress={handleOrderCreate}
        />
      </View>
      {isVisible && (
        <SuccessModal
          visible={isVisible}
          onNavigate={navigateToHome}
          onClose={handleCloseModal}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 22,
  },

  infoWrapper: {
    gap: 30,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 30,
    paddingHorizontal: 22,
  },

  wrapper: {
    gap: 10,
  },

  title: {
    marginTop: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addressContent: {
    shadowColor: colors.border,
    elevation: 40,
    gap: 10,
    borderRadius: 8,
  },

  divider: {
    height: 2,
    width: '100%',
    backgroundColor: colors.border,
  },

  address: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },

  name: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  payment: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: colors.border,
    elevation: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  totalPayment: {
    borderRadius: 8,
    shadowColor: colors.border,
    elevation: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
  },

  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    color: colors.primary,
  },

  submitOrder: {
    width: '100%',
    height: 60,
  },

  textButton: {
    lineHeight: lineHeights.lg,
    fontFamily: fontsFamily.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.lg,
    textTransform: 'uppercase',
  },
});
