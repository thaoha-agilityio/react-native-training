import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';
import {useCallback, useEffect, useRef, useState} from 'react';
import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';
import {useShallow} from 'zustand/shallow';
import Toast from 'react-native-toast-message';

// Components
import {ArrowLeftIcon, MarkerIcon, StarIcon} from '@/components/icons';
import {Button, FastImage, Quantity, SelectColor, Text} from '@/components';

// Styles
import {styles} from './styles';

// Themes
import {colors} from '@/themes';

// Interfaces
import {AppStackScreenProps} from '@/interfaces';

// Constants
import {SCREENS, SUCCESS_MESSAGES} from '@/constants';

// Hooks
import {useFetchProductDetails} from '@/hooks';

// Utils
import {formatPrice} from '@/utils';

// Stores
import {useCartStore} from '@/stores';

const width = Dimensions.get('window').width;
type ProductDetailsScreenProps = AppStackScreenProps<
  typeof SCREENS.PRODUCT_DETAILS
>;

export const ProductDetailsScreen = ({
  navigation,
  route,
}: ProductDetailsScreenProps) => {
  const {id} = route.params;
  const progress = useSharedValue<number>(0);
  const ref = useRef<ICarouselInstance>(null);
  const [count, setCount] = useState(1);

  // Hooks
  const {product, isLoading, error} = useFetchProductDetails(id);

  // Stores
  const [addItemToCart] = useCartStore(
    useShallow(state => [state.addItemToCart, state.updateQuantity]),
  );

  const {
    name = '',
    images = [],
    price = 0,
    description = '',
    reviewNumber = 0,
    rating = 0,
  } = product || {};

  const handleAddToCart = useCallback(() => {
    addItemToCart({
      productId: id.toString(),
      name,
      price,
      quantity: count,
      image: images[0].image,
      id: id.toString(),
    });

    Toast.show({type: 'success', text1: SUCCESS_MESSAGES.ADD_TO_CART});
  }, [addItemToCart, count, id, images, name, price]);

  const handlePressPagination = useCallback(
    (index: number) => {
      ref.current?.scrollTo({
        count: index - progress.get(),
        animated: true,
      });
    },
    [progress],
  );

  const renderItemImg = ({item}: {item: {image: string}}) => (
    <FastImage uri={item.image} style={styles.image} />
  );

  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();

      return;
    }

    navigation.navigate(SCREENS.BOTTOM_TAB, {screen: SCREENS.HOME});
  }, [navigation]);

  const customReanimatedStyle = useCallback(
    (progress: number, index: number, length: number) => {
      let val = Math.abs(progress - index);
      if (index === 0 && progress > length - 1) {
        val = Math.abs(progress - length);
      }

      return {
        transform: [
          {
            translateY: interpolate(val, [0, 1], [0, 0], Extrapolation.CLAMP),
          },
        ],
      };
    },
    [],
  );

  const handleChangeQuantity = useCallback((qty: number) => {
    setCount(qty);
  }, []);

  useEffect(() => {
    if (!isLoading && !product) {
      navigation.navigate(SCREENS.NOT_FOUND);
    }
  }, [error, isLoading, navigation, product]);

  if (isLoading) {
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <Carousel
            ref={ref}
            data={images}
            renderItem={renderItemImg}
            width={width * 0.86}
            height={455}
            style={styles.carousel}
            onProgressChange={progress}
          />
          <Pagination.Custom<{img: string}>
            size={15}
            data={images.map(item => ({img: item.image}))}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            containerStyle={styles.paginationContainer}
            horizontal
            progress={progress}
            onPress={handlePressPagination}
            customReanimatedStyle={customReanimatedStyle}
          />

          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <ArrowLeftIcon color={colors.dark} />
          </TouchableOpacity>
          <View style={styles.selectColorWrapper}>
            <SelectColor bgColor={colors.light} isActive />
            <SelectColor bgColor={colors.select.primary} />
            <SelectColor bgColor={colors.select.secondary} />
          </View>
        </View>
      </ScrollView>

      <View style={styles.mainContent}>
        <View>
          <Text style={styles.name} size="xl">
            {name}
          </Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>${formatPrice(price)}</Text>
            <Quantity
              initialCount={count}
              onQuantityChange={handleChangeQuantity}
            />
          </View>
          <View style={styles.reviewWrapper}>
            <View style={styles.rateWrapper}>
              <StarIcon color={colors.star} />
              <Text style={styles.rate}>{rating}</Text>
            </View>
            <Text style={styles.review}>({reviewNumber} reviews)</Text>
          </View>
          <Text style={styles.description} numberOfLines={4}>
            {description}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Button style={styles.markerButton}>
            <MarkerIcon />
          </Button>
          <Button
            title="Add to cart"
            style={styles.addCardButton}
            onPress={handleAddToCart}
          />
        </View>
      </View>
    </View>
  );
};
