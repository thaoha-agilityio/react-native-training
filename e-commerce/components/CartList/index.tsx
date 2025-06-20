import { memo, useCallback, useMemo } from 'react';
import {
  ListRenderItemInfo,
  FlatList,
  StyleSheet,
  ViewToken,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

// Components
import { Text } from '@/components';
import { Item } from './Item';

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
  const viewableItems = useSharedValue<ViewToken[]>([]);

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
        <Item
          id={id}
          img={image}
          name={name}
          price={price}
          quantity={quantity}
          onRemove={onRemove}
          isLastItem={isLastItem}
          onChangeQuantity={onChangeQuantity}
          viewableItems={viewableItems}
        />
      );
    },
    [data.length, onChangeQuantity, onRemove, viewableItems],
  );

  const renderEmptyList = useMemo(
    () => (
      <Text style={styles.noItems} size="sm">
        No items in your cart
      </Text>
    ),
    [],
  );
  const handleViewableItemsChanged = ({
    viewableItems: vItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    viewableItems.value = vItems;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderCartItem}
      keyExtractor={getKeyExtractor}
      ListEmptyComponent={renderEmptyList}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={false}
      maxToRenderPerBatch={6}
      initialNumToRender={6}
      onViewableItemsChanged={handleViewableItemsChanged}
    />
  );
};

export const CartList = memo(CartListComponent);

const styles = StyleSheet.create({
  noItems: {
    textAlign: 'center',
    paddingVertical: 20,
  },
});
