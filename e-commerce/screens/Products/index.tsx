import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useCallback } from 'react';

// Components
import { Input, ProductList, ProductsSkeleton, Text } from '@/components';
import { LogoIcon, SearchBarIcon } from '@/components/icons';

// Hooks
import { useInfiniteProducts, useTheme } from '@/hooks';

// Themes
import { fontsFamily } from '@/themes';

// Constants
import { ROUTES } from '@/constants';

// Utils
import { formatNumberWithUnit } from '@/utils';

export const ProductsScreen = () => {
  const { colors } = useTheme();
  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteProducts(12);

  const handleNavigateProductsScreen = useCallback((id: string) => {
    router.push(ROUTES.PRODUCT_DETAILS(id));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.content }]}>
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
        {formatNumberWithUnit(data.length, '+Item')}
      </Text>

      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <ProductList
          data={data}
          onLoadMore={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          onShowProductDetails={handleNavigateProductsScreen}
        />
      )}
    </View>
  );
};

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
