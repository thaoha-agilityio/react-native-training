import {memo} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';

// Components
import {AddCartIcon} from '@/components/icons';
import {Text} from '../Text';

// Utils
import {formatPrice} from '@/utils';

// Interfaces
import {Cart} from '@/interfaces';

// Themes
import {colors, fontsFamily, fontSizes} from '@/themes';
import {FastImage} from '../FastImage';

interface CardItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart: (item: Cart) => void;
  onPress?: (id: string) => void;
}

const CardItemComponent = ({
  id,
  name,
  price,
  image,
  onAddToCart,
  onPress,
}: CardItemProps) => {
  const handleOnPress = () => {
    onPress?.(id);
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: id.toString(),
      name,
      price,
      quantity: 1, // Default quantity when adding
      image,
      id: id.toString(),
    });
  };

  return (
    <TouchableOpacity onPress={handleOnPress}>
      <View style={style.content}>
        <View style={style.imgWrapper}>
          <FastImage uri={image} style={style.img} />
          <TouchableOpacity
            testID="add-to-cart"
            style={style.addToCart}
            onPress={handleAddToCart}>
            <AddCartIcon />
          </TouchableOpacity>
        </View>
        <Text style={style.title} numberOfLines={1}>
          {name}
        </Text>
        <Text style={style.price}>$ {formatPrice(price)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const CardItem = memo(CardItemComponent);

const screenWidth = Dimensions.get('window').width;
const imgWidth = screenWidth * 0.41;

const style = StyleSheet.create({
  content: {
    width: '48%',
  },
  imgWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    width: imgWidth,
    height: 200,
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  addToCart: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  title: {
    color: colors.text.helper,
    fontFamily: fontsFamily.primary,
    fontSize: fontSizes.sm,
    marginTop: 10,
    marginBottom: 5,
  },
  price: {
    color: colors.text.primary,
    fontFamily: fontsFamily.bold,
    fontSize: fontSizes.sm,
  },
});
