import {StyleSheet, View} from 'react-native';

// Components
import {Text} from '@/components';

export const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Favorites screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
