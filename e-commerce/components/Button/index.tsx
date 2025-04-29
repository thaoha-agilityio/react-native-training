import { memo, PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
  Pressable,
  PressableProps,
} from 'react-native';

// Styles
import { colors, fontsFamily, fontSizes, lineHeights } from '@/themes';

type ButtonProps = PropsWithChildren<PressableProps> & {
  title?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md';
  extraTextStyle?: StyleProp<TextStyle>;
};

const ButtonComponent = ({
  isLoading = false,
  variant = 'primary',
  size = 'sm',
  disabled,
  style,
  extraTextStyle,
  title,
  children,
  ...rest
}: ButtonProps) => (
  <Pressable
    role="button"
    disabled={disabled}
    style={[
      buttonBaseStyles,
      buttonStyles[variant].button,
      buttonSizes[size].button,
      style,
      { ...(disabled && disabledButtonStyle) },
    ]}
    {...rest}
  >
    {title ? (
      <Text
        style={[
          buttonStyles[variant].title,
          buttonSizes[size].title,
          extraTextStyle,
        ]}
      >
        {title}
      </Text>
    ) : (
      children
    )}
    {isLoading && <ActivityIndicator size="small" color="white" />}
  </Pressable>
);

export const Button = memo(ButtonComponent);

const buttonStyles = {
  primary: StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
    },
    title: {
      color: colors.light,
      textTransform: 'capitalize',
      fontFamily: fontsFamily.secondary,
    },
  }),

  secondary: StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
    },
    title: {
      color: colors.light,
      textTransform: 'capitalize',
      fontFamily: fontsFamily.extraBold,
    },
  }),

  outline: StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      borderColor: colors.primary,
      borderWidth: 1,
    },
    title: {
      color: colors.primary,
      fontFamily: fontsFamily.secondary,
    },
  }),

  text: StyleSheet.create({
    button: {},
    title: {
      color: colors.primary,
      fontFamily: fontsFamily.semiBold,
    },
  }),
};

const buttonSizes = {
  sm: StyleSheet.create({
    button: {
      paddingVertical: 2,
    },
    title: {
      fontSize: fontSizes.md,
    },
  }),

  md: StyleSheet.create({
    button: {
      paddingVertical: 16,
    },
    title: {
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.sm,
    },
  }),
};

const disabledButtonStyle: ViewStyle = {
  backgroundColor: colors.disabled,
};

const buttonBaseStyles: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 6,
  flexDirection: 'row',
  gap: 10,
};
