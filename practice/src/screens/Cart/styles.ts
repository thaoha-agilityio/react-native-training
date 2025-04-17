import {colors, fontsFamily, fontWeights} from '@/themes';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    paddingTop: Platform.OS === 'ios' ? 45 : 15,
    paddingHorizontal: 20,
  },

  goBack: {
    backgroundColor: 'transparent',
  },

  block: {
    width: 20,
  },

  headingWrapper: {
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  heading: {
    textAlign: 'center',
  },

  codeWrapper: {
    flexDirection: 'row',
  },

  mainContent: {
    paddingTop: 14,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 30,
  },

  total: {
    color: colors.text.review,
    fontWeight: fontWeights.bold,
  },

  totalNumber: {
    color: colors.text.primary,
    fontWeight: fontWeights.bold,
  },

  totalWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },

  checkOutButton: {
    height: 60,
    fontWeight: fontWeights.semiBold,
  },

  promoCodeWrapper: {
    position: 'relative',
    marginBottom: 20,
  },

  promoCodeInput: {
    height: 44,
    fontFamily: fontsFamily.primary,
    fontSize: 16,
    width: '100%',
    padding: 10,
  },

  promoCodeButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
