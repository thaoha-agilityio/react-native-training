import {useShallow} from 'zustand/shallow';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';

// Constants
import {SCREENS} from '@/constants';

// Interfaces
import {AppStackScreenProps} from '@/interfaces';

// Styles
import {styles} from './styles';

// Components
import {
  ArrowLeftIcon,
  DeliveryIcon,
  EditIcon,
  MasterCardIcon,
} from '@/components/icons';
import {Button, Text} from '@/components';

// Stores
import {useAuthStore, useCartStore} from '@/stores';

// Utils
import {formatPrice} from '@/utils';

// Hooks
import {useOrderCreated} from '@/hooks';

type CheckOutScreenProps = AppStackScreenProps<typeof SCREENS.CHECK_OUT>;

export const CheckOutScreen = ({navigation}: CheckOutScreenProps) => {
  // Define shipping fee
  const shippingFee = 5;

  const [cart, getTotalPrice, clearCart] = useCartStore(
    useShallow(state => [state.cart, state.getTotalPrice, state.clearCart]),
  );
  const userId = useAuthStore(state => state.userId);
  const {mutate: createOrder, isPending} = useOrderCreated();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const totalOrderPrice = () => {
    const price = getTotalPrice();
    return price + shippingFee;
  };

  const handleOrderCreate = () => {
    const payload = {
      userId: userId.toString(),
      shippingFee,
      total: totalOrderPrice(),
      orderItems: cart,
    };

    createOrder(payload, {
      onSuccess: handleOrderCreateSuccess,
      onError: error => handleOrderCreateError(error.message),
    });
  };

  const handleOrderCreateSuccess = () => {
    clearCart();
    navigation.navigate(SCREENS.SUCCESS);
  };

  const handleOrderCreateError = (error: string) => {
    Toast.show({type: 'error', text1: error});
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headingWrapper}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>

        <Text variant="heading" size="sm" style={styles.heading}>
          Check out
        </Text>
        <View style={styles.block} />
      </View>

      <View style={styles.infoWrapper}>
        {/*Address  */}
        <View style={styles.wrapper}>
          <View style={styles.title}>
            <Text size="md">Shipping Address</Text>
            <TouchableOpacity>
              <EditIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.addressContent}>
            <Text size="md" style={styles.name}>
              Bruno Fernandes
            </Text>
            <View style={styles.divider} />
            <Text variant="description" size="base" style={styles.address}>
              25 rue Robert Latouche, Nice, 06200, Côte D’azur, France
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
          <View style={styles.payment}>
            <TouchableOpacity>
              <MasterCardIcon />
            </TouchableOpacity>

            <Text size="base" style={styles.numberCard}>
              **** **** **** 3947
            </Text>
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
          <View style={styles.payment}>
            <DeliveryIcon />

            <Text size="base" style={styles.numberCard}>
              Fast (2-3days)
            </Text>
          </View>
        </View>
        <View style={styles.totalPayment}>
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
              $ {formatPrice(shippingFee)}
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
          onPress={handleOrderCreate}
          title="submit order"
        />
      </View>
    </ScrollView>
  );
};
