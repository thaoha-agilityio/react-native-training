import { ActivityIndicator, View } from 'react-native';
import { ResponsiveGrid } from 'react-native-flexible-grid';
import { memo, useCallback } from 'react';

// Components
import { CardItem } from '../CardItem';

// Types
import { Product } from '@/interfaces';

// Constants
import { PRODUCT_HEIGHTS } from '@/constants';

interface ProductsProps {
  data: Product[];
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
  onShowProductDetails: (id: string) => void;
  onLoadMore?: () => void;
}
const ProductsComponent = ({
  data,
  isFetchingNextPage = false,
  onLoadMore,
  onShowProductDetails,
}: ProductsProps) => {
  const getKeyExtractor = useCallback((item: Product) => {
    const { id } = item || {};

    return id;
  }, []);

  const renderItem = useCallback(
    ({ item, index }: any) => {
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
          height={PRODUCT_HEIGHTS[index % 2]}
          onPress={onShowProductDetails}
        />
      );
    },
    [onShowProductDetails],
  );

  return (
    <View>
      <ResponsiveGrid
        maxItemsPerColumn={2}
        data={data}
        renderItem={renderItem}
        itemUnitHeight={80}
        showScrollIndicator={false}
        keyExtractor={getKeyExtractor}
        onEndReached={onLoadMore}
        FooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator testID="loading-indicator" />
          ) : null
        }
      />
    </View>
  );
};

export const ProductList = memo(ProductsComponent);
