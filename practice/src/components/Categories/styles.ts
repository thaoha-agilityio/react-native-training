import {colors, fontsFamily} from '@/themes';
import {StyleSheet} from 'react-native';

export const categoryStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  activeText: {
    color: colors.primary,
    fontFamily: fontsFamily.semiBold,
  },

  inactiveText: {
    color: colors.text.secondary,
    fontFamily: fontsFamily.primary,
  },
});

export const categoriesStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 25,
  },
});
