import { memo } from 'react';
import { ViewToken } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// Components
import { CartItem } from '../CartItem';

interface ItemProps {
  id: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  isLastItem?: boolean;
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, quantity: number) => void;
  viewableItems: SharedValue<ViewToken[]>;
}

const ItemComponent = ({
  id,
  img,
  name,
  price,
  isLastItem,
  quantity,
  onRemove,
  onChangeQuantity,
  viewableItems,
}: ItemProps) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value
        .filter((item) => item.isViewable)
        .find((viewableItem) => viewableItem.item.id === id),
    );

    return {
      opacity: withTiming(isVisible ? 1 : 0.7, { duration: 100 }),
      transform: [{ scale: withTiming(isVisible ? 1 : 0.9) }],
    };
  }, []);

  return (
    <Animated.View style={[rStyle]}>
      <CartItem
        id={id}
        img={img}
        name={name}
        price={price}
        quantity={quantity}
        onRemove={onRemove}
        isLastItem={isLastItem}
        onChangeQuantity={onChangeQuantity}
      />
    </Animated.View>
  );
};

export const Item = memo(ItemComponent);
