import {StyleSheet, View} from 'react-native';

// Components
import {Button, Text} from '@/components';
import {CheckIcon, ImageIcon} from '@/components/icons';

// Constants
import {SCREENS} from '@/constants';

// Interfaces
import {AppStackScreenProps} from '@/interfaces';

type SuccessScreenProps = AppStackScreenProps<typeof SCREENS.SUCCESS>;

export const SuccessScreen = ({navigation}: SuccessScreenProps) => {
  const handleNavigateHome = () => {
    navigation.navigate(SCREENS.BOTTOM_TAB, {screen: SCREENS.HOME});
  };

  return (
    <View style={styles.container}>
      <Text variant="title" size="3xl" style={styles.title}>
        SUCCESS!
      </Text>
      <View>
        <ImageIcon style={styles.img} />
        <CheckIcon style={styles.icon} />
      </View>
      <Text variant="description" size="md" style={styles.description}>
        Your order will be delivered soon. Thank you for choosing our app!
      </Text>
      <View style={styles.buttonWrapper}>
        <Button style={styles.button} title="Track your orders" />
        <Button
          variant="outline"
          style={styles.button}
          onPress={handleNavigateHome}
          title="BACK TO HOME"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  title: {
    marginBottom: 30,
  },
  img: {
    position: 'relative',
  },
  icon: {position: 'absolute', bottom: -20, right: 100},
  description: {
    marginTop: 35,
  },
  buttonWrapper: {
    gap: 25,
    marginTop: 40,
    width: '100%',
  },
  button: {
    width: '100%',
    height: 60,
  },
});
