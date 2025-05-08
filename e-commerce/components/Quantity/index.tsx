import { memo, useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { MinusIcon, PlusIcon } from '@/components/icons';
import { Text } from '../Text';

// Themes
import { fontWeights, fontsFamily } from '@/themes';

type QuantityProps = {
  initialCount: number;
  onQuantityChange: (qty: number) => void;
};

const QuantityComponent = ({
  initialCount,
  onQuantityChange,
}: QuantityProps) => {
  const [count, setCount] = useState(initialCount);

  const handleIncrease = useCallback(() => {
    const updateCount = count + 1;

    setCount(updateCount);
    onQuantityChange(updateCount);
  }, [count, onQuantityChange]);

  const handleDecrease = useCallback(() => {
    if (count <= 1) return;

    const updateCount = count - 1;

    setCount(updateCount);
    onQuantityChange(updateCount);
  }, [count, onQuantityChange]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="quantity-decrease"
        style={styles.button}
        onPress={handleDecrease}
      >
        <MinusIcon />
      </TouchableOpacity>
      <Text style={styles.count} size="lg">
        {count}
      </Text>
      <TouchableOpacity
        testID="quantity-increase"
        style={styles.button}
        onPress={handleIncrease}
      >
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
};

export const Quantity = memo(QuantityComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 0.5,
  },
  count: {
    textAlign: 'center',
    paddingHorizontal: 15,
    letterSpacing: 0.5,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontsFamily.semiBold,
  },
});
