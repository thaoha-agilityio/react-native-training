import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});
