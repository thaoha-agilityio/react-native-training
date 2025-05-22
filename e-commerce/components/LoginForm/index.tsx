import { StyleSheet, TextInput, View } from 'react-native';
import { memo, useCallback, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

// Components
import { PasswordInput, Button, Input } from '@/components';
import { UserIcon } from '../icons';

// Constants
import { FORM_VALIDATION_MESSAGE, REGEX } from '@/constants';

// Utils
import { clearErrorOnChange } from '@/utils';

// Themes
import { colors, fontSizes } from '@/themes';

type LoginPayload = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onsubmit: (data: LoginPayload) => Promise<void>;
  isLoading?: boolean;
}

const LoginFormComponent = ({
  onsubmit,
  isLoading = false,
}: LoginFormProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginPayload>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });

  const LOGIN_FORM_VALIDATION = {
    EMAIL: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Email'),
      pattern: {
        value: REGEX.EMAIL,
        message: FORM_VALIDATION_MESSAGE.INVALID('Email'),
      },
    },
    PASSWORD: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Password'),
      minLength: {
        value: 8,
        message: FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8),
      },
      maxLength: {
        value: 32,
        message: FORM_VALIDATION_MESSAGE.MAX_LENGTH('Password', 32),
      },
      pattern: {
        value: REGEX.ALL_WHITE_SPACE,
        message: FORM_VALIDATION_MESSAGE.ALL_WHITE_SPACE('Password'),
      },
    },
  };

  const handleInputChange = useCallback(
    (name: keyof LoginPayload, onChange: (value: string) => void) => {
      return (value: string) => {
        onChange(value);

        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const onSubmit = useCallback(
    async (data: LoginPayload) => {
      onsubmit(data);
    },
    [onsubmit],
  );

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const handleFocusPassword = useCallback(() => {
    passwordRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              ref={emailRef}
              value={value?.trim()}
              variant="subtle"
              placeholder="Email"
              errorMessage={error?.message}
              onChangeText={handleInputChange('email', onChange)}
              returnKeyType="next"
              autoCapitalize="none"
              onSubmitEditing={handleFocusPassword}
              inputMode="email"
              startContent={<UserIcon />}
              placeholderTextColor={colors.text.placeholder}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.EMAIL}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <PasswordInput
              {...rest}
              placeholder="Password"
              ref={passwordRef}
              errorMessage={error?.message}
              onChangeText={handleInputChange('password', onChange)}
              returnKeyType="done"
              autoCapitalize="none"
              placeholderTextColor={colors.text.placeholder}
            />
          )}
          rules={LOGIN_FORM_VALIDATION.PASSWORD}
        />
      </View>
      <Button
        variant="link"
        title="Forgot Password"
        size="xs"
        style={styles.link}
      />

      <Button
        variant="secondary"
        size="lg"
        disabled={isLoading || !isDirty || !isValid}
        isLoading={isLoading}
        style={styles.submitButton}
        onPress={handleSubmit(onSubmit)}
        title="Login"
      />
    </View>
  );
};

export const LoginForm = memo(LoginFormComponent);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  form: {
    gap: 31,
    marginBottom: 9,
  },

  submitButton: {
    marginTop: 52,
    marginBottom: 30,
    height: 55,
    fontSize: fontSizes.xl,
  },

  link: {
    justifyContent: 'flex-end',
  },
});
