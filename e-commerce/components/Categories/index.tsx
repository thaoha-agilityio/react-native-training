import { StyleSheet, FlatList, View } from 'react-native';

// Components
import { Category } from './Category';

// Constants
import { CATEGORIES } from '@/constants';

const CategoriesComponent = () => (
  <View style={styles.container}>
    <FlatList
      contentContainerStyle={styles.content}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={CATEGORIES}
      renderItem={({ item }) => (
        <Category title={item.title} uri={item.image} />
      )}
      keyExtractor={(item) => item.title}
    />
  </View>
);

export const Categories = CategoriesComponent;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingRight: 0,
    width: '100%',
    borderRadius: 10,
  },

  content: {
    gap: 16,
    alignItems: 'center',
  },
});
