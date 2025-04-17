import {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

// Icons
import {CartIcon} from '@/components/icons';

// Components
import {Text} from '@/components';

// Themes
import {colors} from '@/themes';

// Stores
import {useCartStore} from '@/stores';

export interface ShoppingCartProps {
  onNavigation: () => void;
}

const ShoppingCartComponent = ({onNavigation}: ShoppingCartProps) => {
  const cart = useCartStore(state => state.cart);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onNavigation} testID="cart-icon">
        <CartIcon />
      </TouchableOpacity>
      {cart.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cart.length}</Text>
        </View>
      )}
    </View>
  );
};

export const ShoppingCart = memo(ShoppingCartComponent);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 30,
    height: 30,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 14,
    height: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: colors.light,
    fontSize: 9,
    lineHeight: 12,
    fontWeight: 'bold',
  },
});
