import {memo, PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

// Styles
import {colors, fontsFamily, fontSizes, lineHeights} from '@/themes';

type ButtonProps = PropsWithChildren<TouchableOpacityProps> & {
  title?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'outline' | 'link';
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
  <TouchableOpacity
    role="button"
    activeOpacity={0.8}
    disabled={disabled}
    style={[
      buttonBaseStyles,
      buttonStyles[variant].button,
      buttonSizes[size].button,
      style,
      {...(disabled && disabledButtonStyle)},
    ]}
    {...rest}>
    {title ? (
      <Text
        style={[
          buttonStyles[variant].title,
          buttonSizes[size].title,
          extraTextStyle,
        ]}>
        {title}
      </Text>
    ) : (
      children
    )}
    {isLoading && <ActivityIndicator size="small" color="white" />}
  </TouchableOpacity>
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
      fontFamily: fontsFamily.semiBold,
    },
  }),

  secondary: StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
    },
    title: {
      color: colors.light,
      textTransform: 'capitalize',
      fontFamily: fontsFamily.secondarySemiBold,
    },
  }),

  outline: StyleSheet.create({
    button: {
      backgroundColor: 'transparent',
      borderColor: colors.swipe,
      borderWidth: 1,
    },
    title: {
      color: colors.swipe,
      textTransform: 'uppercase',
      fontFamily: fontsFamily.semiBold,
    },
  }),

  link: StyleSheet.create({
    button: {},
    title: {
      color: colors.swipe,
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
