import { View, Text, StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <View>
      <Text style={styles.text}>Explore screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});
