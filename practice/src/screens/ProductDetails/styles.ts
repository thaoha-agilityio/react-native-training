import {Platform, StyleSheet} from 'react-native';
import {colors, fontSizes, fontWeights, fontsFamily} from '@/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },

  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 62,
    position: 'absolute',
    right: 0,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: Platform.OS === 'ios' ? 55 : 35,
    width: 40,
    height: 40,
    backgroundColor: colors.light,
    borderRadius: 6,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  carousel: {
    position: 'absolute',
    right: 0,
  },
  paginationContainer: {
    position: 'absolute',
    alignItems: 'center',
    gap: 10,
    top: 400,
    right: 50,
  },

  dot: {
    width: 20,
    height: 9,
    borderRadius: 4,
  },

  activeDot: {
    backgroundColor: colors.primary,
    overflow: 'hidden',
    width: 30,
  },

  inactiveDot: {
    backgroundColor: colors.error,
  },

  mainContent: {
    backgroundColor: colors.light,
    marginHorizontal: 25,
    justifyContent: 'space-between',
    height: '40%',
  },

  name: {
    fontFamily: fontsFamily.secondaryMedium,
    color: colors.swipe,
  },

  priceWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },

  price: {
    fontFamily: fontsFamily.primary,
    fontSize: fontSizes.xxl,
    lineHeight: 40,
    color: colors.swipe,
    fontWeight: fontWeights.bold,
  },

  reviewWrapper: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },

  rateWrapper: {
    flexDirection: 'row',
    gap: 10,
  },

  rate: {
    fontFamily: fontsFamily.primary,
    fontWeight: fontWeights.bold,
    fontSize: fontSizes.md,
    color: colors.swipe,
  },

  review: {
    fontFamily: fontsFamily.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: fontSizes.base,
    color: colors.text.review,
  },

  description: {
    fontFamily: fontsFamily.primary,
    fontSize: fontSizes.base,
    color: colors.text.helper,
  },

  buttonWrapper: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    marginBottom: 30,
  },

  markerButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.background.secondary,
  },

  addCardButton: {
    width: '100%',
    height: 60,
    flex: 1,
  },

  selectColorWrapper: {
    gap: 30,
    width: 64,
    height: 194,
    backgroundColor: colors.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    position: 'absolute',
    top: 140,
    left: 25,
    boxShadow: '#8A959E33 0px 2px 4px 0px',
  },
});
