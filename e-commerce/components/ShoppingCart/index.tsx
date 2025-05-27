import { memo } from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

// Icons
import { CartIcon } from '@/components/icons';

// Components
import { Text } from '@/components';

// Themes
import { colors } from '@/themes';

// Stores
import { useCartStore } from '@/stores';

export interface ShoppingCartProps {
  onNavigation: () => void;
  animatedStyle?: AnimatedStyle<ViewStyle>;
}

const ShoppingCartComponent = ({
  onNavigation,
  animatedStyle,
}: ShoppingCartProps) => {
  const cart = useCartStore((state) => state.cart);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity onPress={onNavigation} testID="cart-icon">
        <CartIcon />
      </TouchableOpacity>
      {cart.length > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cart.length}</Text>
        </View>
      )}
    </Animated.View>
  );
};

export const ShoppingCart = memo(ShoppingCartComponent);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: colors.background.icon,
    width: 32,
    height: 32,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
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
