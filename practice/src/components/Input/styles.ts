import {StyleSheet} from 'react-native';

// Themes
import {colors, fontsFamily, fontSizes, lineHeights} from '@/themes';

export const inputVariantStyles = {
  flushed: StyleSheet.create({
    container: {
      borderBottomWidth: 2,
    },
    input: {
      paddingVertical: 8,
      width: '100%',
      position: 'relative',
    },
    label: {
      marginBottom: 5,
      fontFamily: fontsFamily.primary,
      fontSize: fontSizes.base,
      lineHeight: lineHeights.xs,
      color: colors.text.secondary,
    },
  }),

  subtle: StyleSheet.create({
    container: {
      backgroundColor: colors.light,
      gap: 8,
      boxShadow: '#8A959E1F 1px 1px 1px 1px',
      borderRadius: 10,
    },
    label: {
      color: colors.text.secondary,
      fontSize: fontSizes.xs,
    },
    input: {
      color: colors.text.primary,
      fontFamily: fontsFamily.semiBold,
      padding: 0,
    },
  }),

  outline: StyleSheet.create({
    container: {
      backgroundColor: colors.light,
      gap: 8,
    },
    label: {
      color: colors.text.primary,
      fontSize: fontSizes.xs,
      fontFamily: fontsFamily.tertiarySemiBold,
    },
    input: {
      color: colors.text.primary,
      fontFamily: fontsFamily.tertiarySemiBold,
      padding: 0,
      borderRadius: 8,
      borderColor: colors.border,
      borderWidth: 1,
      width: '100%',
      height: 50,
      paddingHorizontal: 10,
    },
  }),
};

export const inputBaseStyles = StyleSheet.create({
  errorMessage: {
    marginTop: 5,
    fontFamily: fontsFamily.primary,
    fontSize: fontSizes.xs,
    color: colors.error,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startContent: {
    marginHorizontal: 5,
    position: 'absolute',
    left: 0,
  },
  endContent: {
    marginHorizontal: 5,
    position: 'absolute',
    right: 0,
  },
});
