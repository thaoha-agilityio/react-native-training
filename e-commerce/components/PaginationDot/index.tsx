import { memo } from 'react';
import { View, StyleSheet } from 'react-native';

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
  widthActive,
}: PaginationDotProps<T>) => (
  <View style={styles.dots}>
    {items.map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          {
            backgroundColor:
              i === currentIndex ? activeColor : colors.pagination,
          },
          !!widthActive && { width: i === currentIndex ? widthActive : 8 },
        ]}
      />
    ))}
  </View>
);

export const PaginationDot = memo(PaginationDotComponent);

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
});
