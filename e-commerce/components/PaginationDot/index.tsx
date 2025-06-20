import { memo, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

// Themes
import { colors } from '@/themes';

interface PaginationDotProps<T = unknown> {
  currentIndex: number;
  items: T[];
  activeColor?: string;
  widthActive?: number;
}

const PaginationDotComponent = <T,>({
  currentIndex,
  items,
  activeColor = colors.active,
  widthActive = 16, // fallback for animation target
}: PaginationDotProps<T>) => {
  // Create animated values for each dot
  const animations = useRef(items.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    animations.forEach((anim, i) => {
      Animated.timing(anim, {
        toValue: i === currentIndex ? 1 : 0,
        duration: 300,
        useNativeDriver: false, // width and backgroundColor can't use native driver
      }).start();
    });
  }, [currentIndex, animations]);

  const renderDot = (index: number) => {
    const width = animations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [8, widthActive],
    });

    const backgroundColor = animations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [colors.pagination, activeColor],
    });

    return (
      <Animated.View
        key={index}
        style={[
          styles.dot,
          {
            width,
            backgroundColor,
          },
        ]}
      />
    );
  };

  return <View style={styles.dots}>{items.map((_, i) => renderDot(i))}</View>;
};

export const PaginationDot = memo(PaginationDotComponent);

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },

  dot: {
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
});
