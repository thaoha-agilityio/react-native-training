import { memo, useEffect, useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useShallow } from 'zustand/shallow';

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
}

const ShoppingCartComponent = ({ onNavigation }: ShoppingCartProps) => {
  const [cart, getTotalPrice] = useCartStore(
    useShallow((state) => [state.cart, state.getTotalPrice]),
  );
  const total = getTotalPrice();
  const scale = useSharedValue(1);
  const prevQuantityRef = useRef(total);

  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (total !== prevQuantityRef.current) {
      scale.value = withSpring(1.5, { damping: 5 }, () => {
        scale.value = withSpring(1);
      });

      prevQuantityRef.current = total;
    }
  }, [scale, total]);

  return (
    <Animated.View style={[styles.container, animatedScaleStyle]}>
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
