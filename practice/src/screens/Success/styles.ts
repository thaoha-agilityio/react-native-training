import {StyleSheet} from 'react-native';

export const successScreenStyles = StyleSheet.create({
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
    width: '80%',
  },
  buttonWrapper: {
    gap: 25,
    marginTop: 40,
  },
  button: {
    width: 315,
    height: 60,
  },
});
