import {colors, fontsFamily} from '@/themes';
import {Platform, StyleSheet} from 'react-native';

export const loginScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerWrapper: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginTop: Platform.OS === 'ios' ? 50 : 30,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },

  textWrapper: {
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: 30,
  },

  heading: {
    color: colors.text.secondary,
    fontFamily: fontsFamily.tertiaryBold,
    lineHeight: 45,
  },

  title: {
    fontFamily: fontsFamily.tertiaryBold,
  },

  form: {
    justifyContent: 'space-between',
    gap: 40,
  },
});
