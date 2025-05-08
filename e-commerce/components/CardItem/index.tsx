import { memo } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { Image } from '../Image';
import { Text } from '../Text';

import { StarIcon } from '../icons';
// Utils
import { formatNumberWithUnit, formatPrice } from '@/utils';

// Themes
import { colors, fontsFamily, fontSizes } from '@/themes';

interface CardItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  reviewNumber: number;
  height?: number;
  onPress: (id: string) => void;
}

const CardItemComponent = ({
  id,
  name,
  price,
  image,
  rating,
  reviewNumber,
  description,
  height = 124,
  onPress,
}: CardItemProps) => {
  const handleOnPress = () => {
    onPress(id);
  };

  return (
    <TouchableOpacity onPress={handleOnPress} style={style.container}>
      <View style={style.content}>
        <View style={[style.imgWrapper, { height }]}>
          <Image source={image} style={[style.img]} alt={name} />
        </View>
        <View style={style.wrapper}>
          <Text style={style.title} numberOfLines={1}>
            {name}
          </Text>
          <Text numberOfLines={2} size="tiny">
            {description}
          </Text>
          <Text style={style.price} size="xs">
            $ {formatPrice(price)}
          </Text>
          <View style={style.rating}>
            {new Array(rating).fill(0).map((_, index) => (
              <StarIcon key={index} />
            ))}
            <Text size="xs" style={style.reviewer}>
              {formatNumberWithUnit(reviewNumber)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const CardItem = memo(CardItemComponent);

const screenWidth = Dimensions.get('window').width;
const imgWidth = screenWidth * 0.41;

const style = StyleSheet.create({
  container: {
    boxShadow: '#8A959E1F 1px 1px 2px 2px',
    borderRadius: 8,
    width: imgWidth,
  },
  content: {},
  imgWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    width: imgWidth,
  },
  img: {
    width: '100%',
    flex: 1,
  },
  wrapper: {
    gap: 5,
    padding: 8,
  },
  title: {
    fontFamily: fontsFamily.semiBold,
    fontSize: fontSizes.md,
    marginTop: 8,
  },
  price: {
    fontFamily: fontsFamily.semiBold,
    fontSize: fontSizes.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewer: {
    marginLeft: 5,
    color: colors.text.helper,
  },
});
