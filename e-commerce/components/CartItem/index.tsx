import { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { Image, Quantity, Text } from '@/components';

// Utils
import { formatPrice } from '@/utils';

// Themes
import { colors, fontsFamily } from '@/themes';

interface CartItemProps {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  isLastItem?: boolean;
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
}

const CartItemComponent = ({
  id,
  img,
  name,
  price,
  quantity = 1,
  isLastItem = false,
  onChangeQuantity,
}: CartItemProps) => {
  const handleChangeQuantity = useCallback(
    (qty: number) => {
      onChangeQuantity(id, qty);
    },
    [id, onChangeQuantity],
  );

  return (
    <View style={[styles.container, isLastItem && styles.noBorder]}>
      <Image style={styles.img} source={img} />
      <View style={styles.content}>
        <Text style={styles.name} size="md" numberOfLines={1}>
          {name}
        </Text>
        <Text size="sm" variant="description">
          Size : XL
        </Text>
        <View style={styles.wrapper}>
          <Text style={styles.price} size="sm">
            $ {formatPrice(price)}
          </Text>
          <Quantity
            initialCount={quantity}
            onQuantityChange={handleChangeQuantity}
          />
        </View>
      </View>
    </View>
  );
};

export const CartItem = memo(CartItemComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 20,
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
    fontFamily: fontsFamily.semiBold,
  },

  price: {
    fontFamily: fontsFamily.semiBold,
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
