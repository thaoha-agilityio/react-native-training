import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

// Components
import { Input, ProductList, Text } from '@/components';
import { LogoIcon, SearchBarIcon } from '@/components/icons';

// Hooks
import { useInfiniteProducts } from '@/hooks';

// Themes
import { fontsFamily } from '@/themes';
import { ROUTES } from '@/constants';

const WishlistScreen = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteProducts(12);

  const handleNavigateProductsScreen = (id: string) => {
    router.push(ROUTES.PRODUCT_DETAILS(id) as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <LogoIcon />
      </View>
      <View style={styles.input}>
        <Input
          placeholder="Search any Product..."
          variant="search"
          startContent={<SearchBarIcon />}
          style={{ height: 40 }}
        />
      </View>
      <Text size="lg" style={styles.total}>
        {data.length}+ Items
      </Text>
      <ProductList
        data={data}
        onLoadMore={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onShowProductDetails={handleNavigateProductsScreen}
      />
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  logo: {
    marginTop: 12,
    alignItems: 'center',
  },

  input: {
    marginTop: 28,
    gap: 16,
  },

  total: {
    fontFamily: fontsFamily.semiBold,
    paddingTop: 16,
  },
});
