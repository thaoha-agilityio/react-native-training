import {FlatList} from 'react-native';

// Constants
import {CATEGORIES} from '@/constants';

// Components
import {Category} from './Category';

// Styles
import {categoriesStyles} from './styles';

export const Categories = () => (
  <FlatList
    contentContainerStyle={categoriesStyles.container}
    horizontal
    showsHorizontalScrollIndicator={false}
    data={CATEGORIES}
    renderItem={({item}) => (
      <Category title={item.title} icon={item.icon} isEnable={item.isEnable} />
    )}
    keyExtractor={item => item.title}
  />
);
