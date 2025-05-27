import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';

// Components
import { Category } from './Category';

// Constants
import { CATEGORIES } from '@/constants';

type TCategory = {
  title: string;
  image: string;
};
const CategoriesComponent = () => {
  const getKeyExtractor = useCallback((item: TCategory) => item.title, []);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<TCategory>) => (
      <Category title={item.title} uri={item.image} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderItem}
        keyExtractor={getKeyExtractor}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

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
