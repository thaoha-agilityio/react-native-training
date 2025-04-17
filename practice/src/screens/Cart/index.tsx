import {TouchableOpacity, View} from 'react-native';
import {useShallow} from 'zustand/shallow';
import {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

// Constants
import {SCREENS} from '@/constants';

// Components
import {ArrowLeftIcon, ArrowRightIcon} from '@/components/icons';
import {Button, CartList, Input, Text} from '@/components';

// Interfaces
import {AppStackScreenProps} from '@/interfaces';

// Styles
import {styles} from './styles';

// Utils
import {formatPrice} from '@/utils';

// Stores
import {useCartStore} from '@/stores';

// Themes
import {colors} from '@/themes';

type CartScreenProps = AppStackScreenProps<typeof SCREENS.CART>;

export const CartScreen = ({navigation}: CartScreenProps) => {
  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();

      return;
    }

    navigation.navigate(SCREENS.BOTTOM_TAB, {screen: SCREENS.HOME});
  };

  const [cart, updateQuantity, removeCart, getTotalPrice] = useCartStore(
    useShallow(state => [
      state.cart,
      state.updateQuantity,
      state.removeCart,
      state.getTotalPrice,
    ]),
  );

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

  const handleNavigateCheckOut = useCallback(() => {
    navigation.navigate(SCREENS.CHECK_OUT);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingWrapper}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBack}>
          <ArrowLeftIcon />
        </TouchableOpacity>

        <Text variant="heading" size="sm" style={styles.heading}>
          My cart
        </Text>
        <View style={styles.block} />
      </View>

      <View style={styles.mainContent}>
        <CartList
          carts={cart}
          onChangeQuantity={handleUpdateQuantity}
          onRemove={handleRemoveCart}
        />

        <View>
          <View style={styles.promoCodeWrapper}>
            <Input
              placeholder="Enter your promo code"
              variant="subtle"
              style={styles.promoCodeInput}
              placeholderTextColor={colors.disabled}
            />
            <Button style={styles.promoCodeButton}>
              <ArrowRightIcon />
            </Button>
          </View>
          <View style={styles.totalWrapper}>
            <Text size="lg" style={styles.total}>
              Total:
            </Text>
            <Text size="lg" style={styles.totalNumber}>
              ${formatPrice(getTotalPrice())}
            </Text>
          </View>
          <Button
            disabled={!cart.length}
            style={styles.checkOutButton}
            onPress={handleNavigateCheckOut}
            title="Check out"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
