import { memo } from 'react';
import { View, StyleSheet } from 'react-native';

// Themes
import { colors } from '@/themes';

interface PaginationDotProps<T = unknown> {
  currentIndex: number;
  items: T[];
}

const PaginationDotComponent = <T,>({
  currentIndex,
  items,
}: PaginationDotProps<T>) => (
  <View style={styles.dots}>
    {items.map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          {
            backgroundColor:
              i === currentIndex ? colors.active : colors.pagination,
          },
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
