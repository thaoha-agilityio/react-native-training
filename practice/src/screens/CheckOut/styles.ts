import {
  colors,
  fontSizes,
  fontWeights,
  fontsFamily,
  lineHeights,
} from '@/themes';
import {Platform, StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 45 : 15,
    paddingHorizontal: 20,
    backgroundColor: colors.light,
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

  infoWrapper: {
    gap: 30,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 30,
  },

  wrapper: {
    gap: 10,
  },

  title: {
    marginTop: 19,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addressContent: {
    shadowColor: colors.shadow,
    elevation: 40,
    backgroundColor: colors.light,
    gap: 10,
    borderRadius: 8,
  },

  divider: {
    height: 2,
    width: '100%',
    backgroundColor: colors.background.secondary,
  },

  address: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },

  name: {
    color: colors.text.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  payment: {
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: colors.shadow,
    elevation: 40,
    backgroundColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  numberCard: {
    color: colors.text.primary,
  },

  totalPayment: {
    borderRadius: 8,
    shadowColor: colors.shadow,
    elevation: 40,
    backgroundColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 15,
  },

  priceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  price: {
    color: colors.primary,
  },

  submitOrder: {
    width: '100%',
    height: 60,
  },

  textButton: {
    lineHeight: lineHeights.lg,
    fontFamily: fontsFamily.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.lg,
    textTransform: 'uppercase',
  },
});
