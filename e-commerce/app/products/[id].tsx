import {
  Dimensions,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useRef, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

// Components
import { Button, Text, Image, PaginationDot } from '@/components';
import { ArrowLeftIcon, CartIcon, StarIcon } from '@/components/icons';

// Themes
import { colors, fontsFamily } from '@/themes';

// Types
import { ProductImg } from '@/interfaces';

// Utils
import { formatNumberWithUnit, formatPrice } from '@/utils';

// Hooks
import { useFetchProductDetails } from '@/hooks';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const { id } = useLocalSearchParams();
  const { product } = useFetchProductDetails(id.toString());

  const {
    name = '',
    images = [],
    price = 0,
    reviewNumber = 0,
    rating = 0,
    description = '',
  } = product || {};

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: ListRenderItemInfo<ProductImg>) => (
    <View style={{ width: width * 0.92 }}>
      <Image source={item.image} contentFit="cover" style={styles.image} />
    </View>
  );

  const handleGoBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerWrapper}>
        <Pressable onPress={handleGoBack}>
          <ArrowLeftIcon />
        </Pressable>
        <Button style={styles.cartBtn}>
          <CartIcon />
        </Button>
      </View>

      <View style={styles.contentWrapper}>
        <FlatList
          data={images}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          renderItem={renderItem}
        />
        <PaginationDot currentIndex={currentIndex} items={images} />
      </View>
      {/* Info */}
      <View>
        <Text variant="title" size="xl">
          {name}
        </Text>
        <Text size="sm">Vision Alta Men’s Shoes Size (All Colors)</Text>
        <View style={styles.rating}>
          {new Array(rating).fill(0).map((_, index) => (
            <StarIcon key={index} />
          ))}
          <Text size="sm" style={styles.reviewer}>
            {formatNumberWithUnit(reviewNumber)}
          </Text>
        </View>
        <Text size="sm">${formatPrice(price)}</Text>
        <Text style={styles.customText}>Product Details</Text>
        <Text variant="description" size="xs" style={styles.customText}>
          {description}
        </Text>

        <Button style={styles.addToCartBtn}>
          <CartIcon color={colors.light} />
          <Text style={{ color: colors.light }} variant="heading">
            Add to cart
          </Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;

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
  },

  addToCartBtn: {
    height: 36,
    width: 136,
    marginVertical: 20,
  },

  customText: {
    fontFamily: fontsFamily.medium,
    marginTop: 6,
  },
});
