import { useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
  ViewToken,
} from 'react-native';
import Toast from 'react-native-toast-message';

// Components
import {
  Button,
  ImageModal,
  PaginationDot,
  ProductDetailsSkeleton,
  Text,
  ImageCarousel,
} from '@/components';
import { CartIcon, StarIcon } from '@/components/icons';

// Themes
import { colors, fontsFamily } from '@/themes';

// Types
import { ProductImg } from '@/interfaces';

// Utils
import { formatNumberWithUnit, formatPrice, getAPIErrorMessage } from '@/utils';

// Hooks
import { useFetchProductDetails, useTheme } from '@/hooks';

// Stores
import { useCartStore } from '@/stores';

// Constants
import { VIEWABILITY_CONFIG } from '@/constants';

const { width } = Dimensions.get('screen');

export const ProductDetailsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useLocalSearchParams();
  const { product, isLoading, error } = useFetchProductDetails(id.toString());
  const { colors: colorTheme } = useTheme();

  const {
    name = '',
    images = [],
    price = 0,
    reviewNumber = 0,
    rating = 0,
    description = '',
  } = product || {};

  const addItemToCart = useCartStore((state) => state.addItemToCart);

  const handleAddToCart = useCallback(() => {
    addItemToCart({
      productId: id.toString(),
      name,
      price,
      quantity: 1,
      image: images[0].image,
      id: id.toString(),
    });
  }, [addItemToCart, id, images, name, price]);

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  };

  const [visible, setVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState('');

  const handleOpenModal = useCallback((image: string) => {
    setVisible(true);
    setSelectedImage(image);
  }, []);

  const handleCloseImageModal = useCallback(() => {
    setVisible(false);
  }, []);

  const getKeyExtractor = useCallback((item: ProductImg) => item.id, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ProductImg>) => (
      <ImageCarousel
        image={item.image}
        viewStyle={{ width: width - 32 }}
        imageStyle={styles.image}
        onOpenModal={handleOpenModal}
      />
    ),
    [handleOpenModal],
  );

  useEffect(() => {
    if (error) {
      Toast.show({ type: 'error', text1: getAPIErrorMessage(error.message) });
    }
  }, [error]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colorTheme.content }]}
    >
      {isLoading ? (
        <ProductDetailsSkeleton />
      ) : (
        <>
          <View style={styles.contentWrapper}>
            <FlatList
              data={images}
              keyExtractor={getKeyExtractor}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={VIEWABILITY_CONFIG}
              renderItem={renderItem}
            />
            <PaginationDot currentIndex={currentIndex} items={images} />
          </View>
          {/* Info */}
          <View>
            <Text variant="title" size="xl" style={{ lineHeight: 32 }}>
              {name}
            </Text>
            <Text size="sm" style={{ lineHeight: 20 }}>
              Vision Alta Men’s Shoes Size (All Colors)
            </Text>
            <View style={styles.rating}>
              {new Array(rating).fill(0).map((_, index) => (
                <StarIcon key={index} />
              ))}
              <Text size="sm" style={styles.reviewer}>
                {formatNumberWithUnit(reviewNumber, 'review')}
              </Text>
            </View>
            <Text size="sm">${formatPrice(price)}</Text>
            <Text style={styles.customText}>Product Details</Text>
            <Text variant="description" size="xs" style={styles.customText}>
              {description}
            </Text>

            <Button style={styles.addToCartBtn} onPress={handleAddToCart}>
              <CartIcon color={colors.light} />
              <Text style={{ color: colors.light }} variant="heading">
                Add to cart
              </Text>
            </Button>
          </View>
        </>
      )}

      <ImageModal
        image={selectedImage}
        visible={visible}
        onCloseImageModal={handleCloseImageModal}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  headerWrapper: {
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cartBtn: {
    backgroundColor: colors.background.icon,
    width: 32,
    height: 32,
    borderRadius: 50,
  },

  contentWrapper: {
    marginTop: 16,
    height: 235,
  },

  image: {
    flex: 1,
    borderRadius: 16,
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  reviewer: {
    marginLeft: 5,
    color: colors.text.helper,
    lineHeight: 20,
  },

  addToCartBtn: {
    height: 36,
    width: 145,
    marginVertical: 20,
  },

  customText: {
    fontFamily: fontsFamily.medium,
    marginTop: 6,
  },
});
