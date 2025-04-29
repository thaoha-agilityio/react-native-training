import { Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text style={styles.link}>This screen doesn't exist</Text>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    color: '#fff',
  },
});
