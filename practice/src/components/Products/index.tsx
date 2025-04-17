// Libs
import {
  ActivityIndicator,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
} from 'react-native';
import {memo, useCallback, useMemo} from 'react';

// Components
import {CardItem} from '@/components';

// Types
import {Cart, Product} from '@/interfaces';

// Styles
import {PAGINATION_LIMIT} from '@/constants';

interface ProductsProps {
  data: Product[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  onShowProductDetails: (id: string) => void;
  onAddToCart: (item: Cart) => void;
  onLoadMore?: () => void;
}

const ProductsComponent = ({
  data,
  isFetchingNextPage = false,
  onLoadMore,
  onShowProductDetails,
  onAddToCart,
}: ProductsProps) => {
  const getKeyExtractor = useCallback((item: Product) => {
    const {id} = item || {};

    return id;
  }, []);

  const renderItem = useCallback(
    ({item}: ListRenderItemInfo<Product>) => {
      const {id = '', name = '', images = [], price = 0} = item || {};

      return (
        <CardItem
          id={id}
          name={name}
          image={images[0].image}
          price={price}
          onPress={onShowProductDetails}
          onAddToCart={onAddToCart}
        />
      );
    },
    [onAddToCart, onShowProductDetails],
  );

  const renderEmptyList = useMemo(
    () => <Text style={styles.noRecords}>No records to display</Text>,
    [],
  );

  return (
    <FlatList
      numColumns={2}
      data={data}
      renderItem={renderItem}
      keyExtractor={getKeyExtractor}
      columnWrapperStyle={styles.products}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator testID="loading-indicator" />
        ) : null
      }
      ListEmptyComponent={renderEmptyList}
      maxToRenderPerBatch={PAGINATION_LIMIT}
      initialNumToRender={PAGINATION_LIMIT}
    />
  );
};

export const Products = memo(ProductsComponent);

const styles = StyleSheet.create({
  products: {
    gap: 21,
    marginBottom: 15,
  },
  noRecords: {
    textAlign: 'center',
    paddingVertical: 20,
  },
});
