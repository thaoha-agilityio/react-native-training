import {StyleSheet, View} from 'react-native';

// Components
import {Text} from '@/components';

export const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Notifications screen</Text>
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
