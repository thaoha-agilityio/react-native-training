import {memo, useCallback, useMemo} from 'react';
import {ListRenderItemInfo, FlatList, StyleSheet} from 'react-native';

// Components
import {CartItem, Text} from '@/components';

// Types
import {Cart} from '@/interfaces';

// Constants
import {PAGINATION_LIMIT} from '@/constants';

interface CartListProps {
  carts: Cart[];
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
}

const CartListComponent = ({
  carts,
  onRemove,
  onChangeQuantity,
}: CartListProps) => {
  const getKeyExtractor = useCallback((item: Cart) => {
    const {id} = item || {};

    return id.toString();
  }, []);

  const renderCartItem = useCallback(
    ({item, index}: ListRenderItemInfo<Cart>) => {
      const {
        id = '',
        name = '',
        image = '',
        price = 0,
        quantity = 0,
      } = item || {};

      const isLastItem = index === carts.length - 1;

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
    [carts.length, onChangeQuantity, onRemove],
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
    <FlatList
      data={carts}
      renderItem={renderCartItem}
      keyExtractor={getKeyExtractor}
      ListEmptyComponent={renderEmptyList}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      maxToRenderPerBatch={PAGINATION_LIMIT}
      initialNumToRender={PAGINATION_LIMIT}
    />
  );
};

export const CartList = memo(CartListComponent);

const styles = StyleSheet.create({
  noItems: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  listContainer: {
    gap: 12,
  },
});
