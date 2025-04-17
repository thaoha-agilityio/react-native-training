import {colors, fontsFamily} from '@/themes';
import {Platform, StyleSheet} from 'react-native';

export const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingTop: Platform.OS === 'ios' ? 0 : 15,
    paddingHorizontal: 24,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 20,
    alignItems: 'center',
  },

  titleContainer: {
    alignItems: 'center',
  },

  title: {
    fontFamily: fontsFamily.secondary,
    color: colors.text.secondary,
  },

  subTile: {
    fontFamily: fontsFamily.secondaryBold,
    textTransform: 'uppercase',
    color: colors.primary,
  },

  categories: {
    paddingBottom: 20,
  },

  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
});
