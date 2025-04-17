import {ActivityIndicator, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import {Products, Text, Categories, ShoppingCart} from '@/components';
import {SearchIcon} from '@/components/icons';

// Styles
import {homeScreenStyles} from './styles';

// Hooks
import {useInfiniteProducts} from '@/hooks';

// Constants
import {PAGINATION_LIMIT, SCREENS, SUCCESS_MESSAGES} from '@/constants';

// Interfaces
import {AppStackScreenProps, Cart} from '@/interfaces';

// Stores
import {useCartStore} from '@/stores';

// Utils
import {getAPIErrorMessage} from '@/utils';

type HomeScreenProps = AppStackScreenProps<typeof SCREENS.HOME>;

export const HomeScreen = ({navigation}: HomeScreenProps) => {
  const {
    data: products,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingProducts,
    error,
  } = useInfiniteProducts(PAGINATION_LIMIT);

  const addItemToCart = useCartStore(state => state.addItemToCart);

  const handleNavigateProductDetails = (id: string) => {
    navigation.navigate(SCREENS.PRODUCT_DETAILS, {id});
  };

  const handleNavigateCart = () => {
    navigation.navigate(SCREENS.CART);
  };

  const handleAddItemToCart = (item: Cart) => {
    addItemToCart(item);
    Toast.show({type: 'success', text1: SUCCESS_MESSAGES.ADD_TO_CART});
  };

  useEffect(() => {
    if (error) {
      Toast.show({type: 'error', text1: getAPIErrorMessage(error.message)});
    }
  }, [error]);

  return (
    <SafeAreaView style={homeScreenStyles.container}>
      <View style={homeScreenStyles.headerContainer}>
        <SearchIcon />
        <View style={homeScreenStyles.titleContainer}>
          <Text size="md" style={homeScreenStyles.title}>
            Make home
          </Text>
          <Text size="md" style={homeScreenStyles.subTile}>
            BEAUTIFUL
          </Text>
        </View>
        <ShoppingCart onNavigation={handleNavigateCart} />
      </View>

      <View style={homeScreenStyles.categories}>
        <Categories />
      </View>

      {isLoadingProducts ? (
        <ActivityIndicator />
      ) : (
        <Products
          data={products}
          isFetchingNextPage={isFetchingNextPage}
          onShowProductDetails={handleNavigateProductDetails}
          onAddToCart={handleAddItemToCart}
          onLoadMore={fetchNextPage}
        />
      )}
    </SafeAreaView>
  );
};
