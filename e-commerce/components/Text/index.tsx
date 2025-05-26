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
import { fontsFamily, fontSizes, lineHeights } from '@/themes';

// Hooks
import { useTheme } from '@/hooks';

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
}: TextProps) => {
  const { colors } = useTheme();

  const textColor = () => {
    switch (variant) {
      case 'heading':
        return colors.primary;

      case 'title':
        return colors.title;

      case 'description':
        return colors.helper;

      case 'label':
        return colors.label;

      default:
        return colors.default;
    }
  };

  return (
    <TextBase
      style={[
        textVariant[variant],
        textSizes[size],
        { color: textColor() },
        style,
      ]}
      {...props}
    >
      {children}
    </TextBase>
  );
};

export const Text = memo(TextComponent);

const textVariant = StyleSheet.create({
  heading: {
    fontFamily: fontsFamily.semiBold,
  },

  title: {
    fontFamily: fontsFamily.extraBold,
  },

  description: {
    fontFamily: fontsFamily.primary,
  },

  default: {
    fontFamily: fontsFamily.primary,
  },

  label: {
    fontFamily: fontsFamily.semiBold,
  },
});

const textSizes = StyleSheet.create({
  tiny: {
    fontSize: fontSizes.tiny,
    lineHeight: lineHeights.base,
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
