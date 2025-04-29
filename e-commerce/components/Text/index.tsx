import { memo, PropsWithChildren } from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  Text as TextBase,
  TextProps as TextBaseProps,
  TextStyle,
} from 'react-native';

// Interfaces
import { TextSize, TextVariant } from '@/interfaces';

// Themes
import { fontsFamily, colors, fontSizes, lineHeights } from '@/themes';

export interface TextProps extends PropsWithChildren<TextBaseProps> {
  variant?: TextVariant;
  size?: TextSize;
  color?: ColorValue;
  style?: StyleProp<TextStyle>;
}

const TextComponent = ({
  variant = 'default',
  size = 'sm',
  color,
  style,
  children,
  ...props
}: TextProps) => (
  <TextBase
    style={[
      textVariant[variant],
      textSizes[size],
      style,
      { ...(color && { color }) },
    ]}
    {...props}
  >
    {children}
  </TextBase>
);

export const Text = memo(TextComponent);

const textVariant = StyleSheet.create({
  heading: {
    fontFamily: fontsFamily.semiBold,
    color: colors.primary,
  },

  title: {
    fontFamily: fontsFamily.extraBold,
    color: colors.primary,
  },

  description: {
    fontFamily: fontsFamily.primary,
    color: colors.text.helper,
  },

  default: {
    fontFamily: fontsFamily.primary,
    color: colors.primary,
  },
});

const textSizes = StyleSheet.create({
  base: {
    fontSize: fontSizes.tiny,
    lineHeight: lineHeights.xs,
  },

  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.base,
  },

  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.xs,
  },

  md: {
    fontSize: fontSizes.md,
    lineHeight: lineHeights.md,
  },

  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights.lg,
  },

  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights.xl,
  },

  xxl: {
    fontSize: fontSizes.xxl,
    lineHeight: lineHeights.xxl,
  },

  '3xl': {
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights.xxl,
  },
});
