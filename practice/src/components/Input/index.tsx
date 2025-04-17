import {forwardRef, memo, PropsWithChildren, Ref} from 'react';
import {
  TextInput,
  TextInputProps as TextInputPropsBase,
  View,
} from 'react-native';

// Styles
import {inputBaseStyles, inputVariantStyles} from './styles';

// Components
import {Text} from '@/components';

// Themes
import {colors} from '@/themes';

export interface TextInputProps extends PropsWithChildren<TextInputPropsBase> {
  errorMessage?: string;
  label?: string;
  startContent?: JSX.Element;
  endContent?: JSX.Element;
  variant?: 'flushed' | 'subtle' | 'outline';
}

const InputComponent = forwardRef(
  (
    {
      errorMessage = '',
      label = '',
      variant = 'flushed',
      style,
      startContent,
      endContent,
      ...props
    }: TextInputProps,
    ref: Ref<TextInput>,
  ) => {
    const borderClass = errorMessage ? colors.error : colors.border;

    return (
      <View>
        <View
          style={[
            inputVariantStyles[variant].container,
            {borderColor: borderClass},
          ]}>
          {!!label && (
            <Text style={[inputVariantStyles[variant].label]}>{label}</Text>
          )}

          <View style={inputBaseStyles.inputWrapper}>
            {!!startContent && (
              <View style={inputBaseStyles.startContent}>{startContent}</View>
            )}
            <TextInput
              ref={ref}
              style={[inputVariantStyles[variant].input, style]}
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

export const Input = memo(InputComponent);
