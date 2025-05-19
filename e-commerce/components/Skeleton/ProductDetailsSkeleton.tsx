import { View, StyleSheet } from 'react-native';

// Themes
import { colors, fontsFamily } from '@/themes';

// Components
import { Button } from '../Button';
import { CartIcon, StarIcon } from '../icons';
import { Text } from '../Text';
import { Skeleton } from './Skeleton';

export const ProductDetailsSkeleton = () => (
  <View style={styles.container}>
    <View style={styles.contentWrapper}>
      <Skeleton height={235} width="100%" borderRadius={16} />
    </View>
    {/* Info */}
    <View style={{ gap: 10 }}>
      <Skeleton height={30} width={100} />

      <View style={styles.rating}>
        {new Array(5).fill(0).map((_, index) => (
          <StarIcon key={index} />
        ))}
      </View>
      <Skeleton height={30} width={50} />
      <Skeleton height={25} width={90} />

      <Text style={styles.customText}>Product Details</Text>
      <Skeleton height={80} width="100%" />

      <Button style={styles.addToCartBtn}>
        <CartIcon color={colors.light} />
        <Text style={{ color: colors.light }} variant="heading">
          Add to cart
        </Text>
      </Button>
    </View>
  </View>
);

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
    marginVertical: 16,
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
