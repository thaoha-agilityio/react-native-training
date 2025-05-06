import { memo } from 'react';
import { View, StyleSheet } from 'react-native';

// Components
import { Image } from '../Image';
import { Text } from '../Text';

interface CategoryProps {
  title: string;
  uri: string;
}
const CategoryComponent = ({ title, uri }: CategoryProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={uri} style={styles.image} />
      </View>
      <Text size="base">{title}</Text>
    </View>
  );
};

export const Category = memo(CategoryComponent);

const styles = StyleSheet.create({
  container: {
    gap: 4,
    alignItems: 'center',
  },

  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
  },

  image: {
    flex: 1,
    width: '100%',
    borderRadius: 50,
  },
});
