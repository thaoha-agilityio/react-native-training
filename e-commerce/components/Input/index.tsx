import { forwardRef, memo, PropsWithChildren, Ref, useState } from 'react';
import {
  TextInput,
  TextInputProps as TextInputPropsBase,
  View,
  StyleSheet,
  useColorScheme,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';

// Components
import { Text } from '@/components';

// Themes
import { colors, fontsFamily, fontSizes } from '@/themes';

export interface TextInputProps extends PropsWithChildren<TextInputPropsBase> {
  errorMessage?: string;
  label?: string;
  startContent?: JSX.Element;
  endContent?: JSX.Element;
  variant?: 'subtle' | 'outline' | 'search';
}

const InputComponent = forwardRef(
  (
    {
      errorMessage = '',
      label = '',
      variant = 'outline',
      style,
      startContent,
      endContent,
      onBlur,
      onFocus,
      ...props
    }: TextInputProps,
    ref: Ref<TextInput>,
  ) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const [isFocus, setIsFocus] = useState(false);

    const getBorderColor = () => {
      if (isFocus && !errorMessage) return colors.background.secondary;

      if (errorMessage) return colors.error;

      return colors.border;
    };

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocus(true);
      onFocus?.(e);
    };
    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      console.log('ssss');
      setIsFocus(false);
      onBlur?.(e);
    };
    return (
      <View>
        <View style={[inputVariantStyles[variant].container]}>
          {!!label && (
            <Text style={[inputVariantStyles[variant].label]}>{label}</Text>
          )}

          <View style={inputBaseStyles.inputWrapper}>
            {!!startContent && (
              <View style={inputBaseStyles.startContent}>{startContent}</View>
            )}
            <TextInput
              ref={ref}
              style={[
                inputVariantStyles[variant].input,
                isDark && { color: colors.light },
                { borderColor: getBorderColor() },
                style,
              ]}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...props}
            />
            {!!endContent && (
              <View style={inputBaseStyles.endContent}>{endContent}</View>
            )}
          </View>
        </View>

        {!!errorMessage && (
          <Text style={inputBaseStyles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    );
  },
);

InputComponent.displayName = 'InputComponent';
export const Input = memo(InputComponent);

const inputVariantStyles = {
  subtle: StyleSheet.create({
    label: {},
    container: {},
    input: {
      paddingVertical: 8,
      paddingLeft: 40,
      width: '100%',
      position: 'relative',
      borderColor: colors.text.helper,
      backgroundColor: colors.background.input,
      borderRadius: 10,
      borderWidth: 1,
      height: 55,
      fontFamily: fontsFamily.semiBold,
      fontSize: fontSizes.xs,
    },
  }),

  search: StyleSheet.create({
    container: {},
    label: {},
    input: {
      color: colors.search,
      fontFamily: fontsFamily.primary,
      fontSize: fontSizes.sm,
      borderRadius: 6,
      paddingLeft: 45,
      position: 'relative',
      width: '100%',
      backgroundColor: colors.light,
    },
  }),

  outline: StyleSheet.create({
    container: {
      gap: 15,
    },
    label: {
      fontSize: fontSizes.xs,
      fontFamily: fontsFamily.primary,
    },
    input: {
      color: colors.text.primary,
      borderRadius: 8,
      borderColor: colors.border,
      borderWidth: 1,
      width: '100%',
      height: 48,
      paddingHorizontal: 20,
      paddingVertical: 14,
      fontFamily: fontsFamily.semiBold,
      fontSize: 13,
    },
  }),
};

const inputBaseStyles = StyleSheet.create({
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
    marginHorizontal: 15,
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  endContent: {
    marginHorizontal: 15,
    position: 'absolute',
    right: 0,
  },
});
