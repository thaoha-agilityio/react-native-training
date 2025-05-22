import { memo, useCallback } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Components
import { Text } from '../Text';
import { Image } from '../Image';
import { Quantity } from '../Quantity';
import { TrashIcon } from '../icons';

// Themes
import { colors, colorTheme, fontsFamily } from '@/themes';

// Utils
import { formatPrice } from '@/utils';

// Hooks
import { useColorScheme } from '@/hooks';

const WIDTH_CARD = Dimensions.get('window').width * 0.89;
const ITEM_HEIGHT = 130;
const WIDTH_SCREEN = Dimensions.get('window').width;

interface CartItemProps {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  isLastItem?: boolean;
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
}

const CartItemComponent = ({
  id,
  img,
  name,
  price,
  quantity = 1,
  onRemove,
  onChangeQuantity,
}: CartItemProps) => {
  const swipeTranslateX = useSharedValue(0);
  const pressed = useSharedValue(false);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const marginVertical = useSharedValue(18);
  const colorScheme = useColorScheme();

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      // only allow swipe left
      if (event.translationX < 0) {
        swipeTranslateX.value = event.translationX;
      }
    })
    .onFinalize(() => {
      // when release, if swipe not enough, return to the original position
      const revealThreshold = -WIDTH_SCREEN * 0.2;
      if (swipeTranslateX.value < revealThreshold) {
        swipeTranslateX.value = withSpring(revealThreshold); // keep the icon
      } else {
        swipeTranslateX.value = withSpring(0); // return to the original position
      }
      pressed.value = false;
    });

  const transformStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: swipeTranslateX.value },
      { scale: withTiming(pressed.value ? 1.05 : 1) },
    ],
  }));

  const itemHeightStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginVertical: marginVertical.value,
  }));

  const handleRemove = () => {
    swipeTranslateX.value = withTiming(-WIDTH_SCREEN, undefined, (isDone) => {
      if (isDone) {
        runOnJS(onRemove)(id);
      }
    });
    itemHeight.value = withTiming(0);
    marginVertical.value = withTiming(0);
  };

  const handleChangeQuantity = useCallback(
    (qty: number) => {
      onChangeQuantity(id, qty);
    },
    [id, onChangeQuantity],
  );

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={itemHeightStyle}>
        {/* Trash icon displayed below item */}
        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={handleRemove}>
            <TrashIcon color="red" />
          </TouchableOpacity>
        </View>

        {/* Card can swipe */}
        <Animated.View
          style={[
            styles.fieldContainer,
            transformStyle,
            { backgroundColor: colorTheme[colorScheme].background },
          ]}
        >
          <Image style={styles.img} source={img} />
          <View style={styles.content}>
            <Text style={styles.name} size="md" numberOfLines={1}>
              {name}
            </Text>
            <Text size="sm" variant="description">
              Size : XL
            </Text>
            <View style={styles.wrapper}>
              <Text style={styles.price} size="sm">
                $ {formatPrice(price)}
              </Text>
              <Quantity
                initialCount={quantity}
                onQuantityChange={handleChangeQuantity}
              />
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

export const CartItem = memo(CartItemComponent);

const styles = StyleSheet.create({
  fieldContainer: {
    backgroundColor: colors.light,
    justifyContent: 'center',
    height: ITEM_HEIGHT,
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    gap: 20,
    paddingLeft: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  iconContainer: {
    position: 'absolute',
    height: ITEM_HEIGHT,
    right: '10%',
    justifyContent: 'center',
  },
  viewContainer: {
    alignItems: 'center',
    width: WIDTH_SCREEN,
  },
  iconWrapper: {
    position: 'absolute',
    height: ITEM_HEIGHT,
    width: WIDTH_CARD,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 25,
    backgroundColor: colors.background.subtle,
    borderRadius: 20,
  },

  container: {
    flexDirection: 'row',
    gap: 20,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 12,
    paddingLeft: 10,
  },

  noBorder: {
    borderBottomWidth: 0,
  },

  img: {
    borderRadius: 10,
    width: 100,
    height: 100,
  },

  content: {
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: 20,
  },

  name: {
    fontFamily: fontsFamily.semiBold,
  },

  price: {
    fontFamily: fontsFamily.semiBold,
  },

  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
