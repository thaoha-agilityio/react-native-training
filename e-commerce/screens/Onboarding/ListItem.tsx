import {
  View,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { memo } from 'react';

// Themes
import { fontsFamily, fontSizes, lineHeights } from '@/themes';

// Types
import { Onboarding } from '@/interfaces';

// Hooks
import { useTheme } from '@/hooks';

// Components
import { Text } from '@/components';

type ListItemProps = {
  item: Onboarding;
  index: number;
  x: SharedValue<number>;
};

const { width, height } = Dimensions.get('screen');

const ListItem = ({ item, index, x }: ListItemProps) => {
  const { colors } = useTheme();

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const rnImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(x.value, inputRange, [20, 0, 20]);
    const opacity = interpolate(x.value, inputRange, [0, 1, 0]);
    return {
      opacity,
      width,
      height,
      transform: [{ translateY }],
    };
  }, [index, x]);

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(x.value, inputRange, [20, 0, 20]);
    const opacity = interpolate(x.value, inputRange, [0, 1, 0]);
    return {
      opacity,
      transform: [{ translateY }],
    };
  }, [index, x]);

  return (
    <View style={[{ width: width - 34 }, styles.itemContainer]}>
      <Animated.Image
        source={item.image as ImageSourcePropType}
        style={[styles.image, rnImageStyle]}
        resizeMode="contain"
      />

      <Animated.View style={[styles.textWrapper, rnTextStyle]}>
        <Text style={[styles.title, { color: colors.title }, rnTextStyle]}>
          {item.title}
        </Text>
        <Text
          style={[styles.description, { color: colors.helper }, rnTextStyle]}
          numberOfLines={3}
        >
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );
};

export default memo(ListItem);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItem: {
    fontWeight: '600',
    lineHeight: 41,
    fontSize: 34,
  },

  image: {
    flex: 1,
    paddingHorizontal: 30,
  },

  textWrapper: {
    marginTop: 33,
  },

  title: {
    textAlign: 'center',
    fontSize: fontSizes.xxl,
    lineHeight: lineHeights.xxl,
  },

  description: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: fontsFamily.semiBold,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.xs,
  },
});
