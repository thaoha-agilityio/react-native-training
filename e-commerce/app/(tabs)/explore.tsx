import { View, StyleSheet } from 'react-native';

import { Text } from '@/components';

export default function ExploreScreen() {
  return (
    <View>
      <Text style={[styles.text]} variant="title">
        Explore screen
      </Text>
      <Text style={[styles.text]} variant="description">
        Explore screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
});
