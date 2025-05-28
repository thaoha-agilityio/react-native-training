import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import { memo, useCallback } from 'react';

// Components
import { CardItem } from '../CardItem';

// Types
import { Product } from '@/interfaces';

// Constants
import { PAGINATION_LIMIT } from '@/constants';

interface ProductsProps {
  data: Product[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  onNavigateProductDetails: (id: string) => void;
}

const imgWidth = (Dimensions.get('screen').width - 32 - 16) / 2;

const ProductsLimitComponent = ({
  data,
  isFetchingNextPage,
  onNavigateProductDetails,
}: ProductsProps) => {
  const getKeyExtractor = useCallback((item: Product) => {
    const { id } = item || {};

    return id.toString();
  }, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Product>) => {
      const {
        id = '',
        name = '',
        images = [],
        price = 0,
        description = '',
        rating = 0,
        reviewNumber = 0,
      } = item || {};

      return (
        <CardItem
          id={id}
          name={name}
          image={images[0].image}
          price={price}
          description={description}
          rating={rating}
          reviewNumber={reviewNumber}
          extraStyles={{ width: imgWidth, height: 250 }}
          onPress={onNavigateProductDetails}
        />
      );
    },
    [onNavigateProductDetails],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={getKeyExtractor}
        contentContainerStyle={styles.content}
        horizontal
        showsHorizontalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        maxToRenderPerBatch={PAGINATION_LIMIT}
        initialNumToRender={PAGINATION_LIMIT}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator testID="loading-indicator" />
          ) : null
        }
      />
    </View>
  );
};

export const ProductsLimit = memo(ProductsLimitComponent);

const styles = StyleSheet.create({
  products: {
    gap: 21,
    marginBottom: 15,
  },
  noRecords: {
    textAlign: 'center',
    paddingVertical: 20,
  },
  content: {
    gap: 16,
    alignItems: 'center',
  },

  container: {
    paddingVertical: 16,
    paddingRight: 0,
    width: '100%',
  },
});
