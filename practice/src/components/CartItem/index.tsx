import {memo, useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

// Components
import {FastImage, Quantity, Text} from '@/components';
import {RemoveIcon} from '@/components/icons';

// Utils
import {formatPrice} from '@/utils';

// Themes
import {colors, fontsFamily, fontSizes, lineHeights} from '@/themes';

interface CartItemProps {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  onRemove: (id: string) => void;
  isLastItem?: boolean;
  onChangeQuantity: (id: string, quantity: number) => void;
}

const CartItemComponent = ({
  id,
  img,
  name,
  price,
  quantity = 1,
  isLastItem = false,
  onRemove,
  onChangeQuantity,
}: CartItemProps) => {
  const handleChangeQuantity = useCallback(
    (qty: number) => {
      onChangeQuantity(id, qty);
    },
    [id, onChangeQuantity],
  );

  const handleRemove = () => {
    onRemove(id);
  };

  return (
    <View style={[styles.container, isLastItem && styles.noBorder]}>
      <FastImage style={styles.img} uri={img} />
      <View style={styles.content}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>$ {formatPrice(price)}</Text>
        </View>
        <Quantity
          initialCount={quantity}
          onQuantityChange={handleChangeQuantity}
        />
      </View>
      <TouchableOpacity onPress={handleRemove} testID="remove-icon">
        <RemoveIcon />
      </TouchableOpacity>
    </View>
  );
};

export const CartItem = memo(CartItemComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 12,
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  img: {
    borderRadius: 10,
    width: 100,
    height: 100,
  },
  content: {
    justifyContent: 'space-between',
  },
  name: {
    color: colors.disabled,
    fontFamily: fontsFamily.semiBold,
    fontSize: fontSizes.base,
    lineHeight: lineHeights.xs,
    marginBottom: 6,
    width: 170,
  },
  price: {
    color: colors.primary,
    fontFamily: fontsFamily.bold,
    fontSize: fontSizes.sm,
  },
});
