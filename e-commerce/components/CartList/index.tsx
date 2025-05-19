import { memo, useCallback, useMemo } from 'react';
import { ListRenderItemInfo, FlatList, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Components
import { CartItem, Text } from '@/components';

// Types
import { Cart } from '@/interfaces';

interface CartListProps {
  data: Cart[];
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
}

const CartListComponent = ({
  data,
  onRemove,
  onChangeQuantity,
}: CartListProps) => {
  const getKeyExtractor = useCallback((item: Cart) => {
    const { id } = item || {};

    return id.toString();
  }, []);

  const renderCartItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Cart>) => {
      const {
        id = '',
        name = '',
        image = '',
        price = 0,
        quantity = 0,
      } = item || {};

      const isLastItem = index === data.length - 1;

      return (
        <CartItem
          id={id}
          img={image}
          name={name}
          price={price}
          quantity={quantity}
          onRemove={onRemove}
          isLastItem={isLastItem}
          onChangeQuantity={onChangeQuantity}
        />
      );
    },
    [data.length, onChangeQuantity, onRemove],
  );

  const renderEmptyList = useMemo(
    () => (
      <Text style={styles.noItems} size="sm">
        No items in your cart
      </Text>
    ),
    [],
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={renderCartItem}
        keyExtractor={getKeyExtractor}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        maxToRenderPerBatch={6}
        initialNumToRender={6}
      />
    </GestureHandlerRootView>
  );
};

export const CartList = memo(CartListComponent);

const styles = StyleSheet.create({
  noItems: {
    textAlign: 'center',
    paddingVertical: 20,
  },
});
