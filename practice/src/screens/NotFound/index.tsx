import {View, StyleSheet, Image} from 'react-native';

// Constants
import {SCREENS} from '@/constants';

// Interfaces
import {AppStackScreenProps} from '@/interfaces';

// Components
import {Button} from '@/components';

type NotFoundScreenProps = AppStackScreenProps<typeof SCREENS.NOT_FOUND>;

export const NotFound = ({navigation}: NotFoundScreenProps) => {
  const handleNavigateHome = () => {
    navigation.navigate(SCREENS.BOTTOM_TAB, {screen: SCREENS.HOME});
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/oops-404.png')}
        style={styles.image}
      />
      <Button
        title="Go Home"
        onPress={handleNavigateHome}
        style={styles.button}
      />
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

  button: {
    width: 215,
    height: 50,
    marginTop: 20,
  },

  image: {
    width: 300,
    height: 300,
  },
});
