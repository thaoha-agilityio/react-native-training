import { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

// Components
import { AvatarUploader, Text, Input, Button, Dropdown } from '@/components';

// Themes
import { colors, fontsFamily } from '@/themes';

// Constants
import { FORM_VALIDATION_MESSAGE, REGEX, US_STATES } from '@/constants';

// Types
import { UserPayload } from '@/interfaces';

// Utils
import { clearErrorOnChange, formatUSPhoneNumber } from '@/utils';

// Hooks
import { useInputRefs, useUploadImage } from '@/hooks';

interface ProfileFormProps {
  isLoading?: boolean;
  avatar?: string;
  email?: string;
  username?: string;
  address?: string;
  city?: string;
  zipCode?: string;
  accountHolderName?: string;
  bankAccountNumber?: string;
  state?: string;
  phoneNumber?: string;
  onEdit: (payload: UserPayload) => void;
}

const ProfileFormComponent = ({
  isLoading,
  email,
  avatar,
  phoneNumber,
  username,
  address,
  city,
  zipCode,
  accountHolderName,
  bankAccountNumber,
  state,
  onEdit,
}: ProfileFormProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors, isDirty, isValid },
  } = useForm<UserPayload>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      avatar,
      email,
      phoneNumber,
      username,
      address,
      city,
      zipCode,
      accountHolderName,
      bankAccountNumber,
      state,
    },
  });

  const { refs, getOnSubmitEditing } = useInputRefs([
    'password',
    'phoneNumber',
    'username',
    'address',
    'city',
    'zipCode',
    'accountHolderName',
    'bankAccountNumber',
  ]);

  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const VALIDATION = {
    USERNAME: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
      pattern: {
        value: REGEX.NAME,
        message: FORM_VALIDATION_MESSAGE.INVALID('Name'),
      },
    },
    PHONE_NUMBER: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Phone number'),
      pattern: {
        value: REGEX.PHONE_NUMBER,
        message: FORM_VALIDATION_MESSAGE.INVALID('Phone number'),
      },
    },
    ADDRESS: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Address'),
    },
    CITY: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('City'),
    },
    ZIP_CODE: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Zip code'),
    },
    BANK_ACCOUNT_NUMBER: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Bank Account Number'),
    },
    ACCOUNT_HOLDER_NAME: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Account Holder Name'),
    },
  };

  const handleInputChange = useCallback(
    (name: keyof UserPayload, onChange: (value: string) => void) => {
      return (value: string) => {
        onChange(value);

        clearErrorOnChange(name, errors, clearErrors);
      };
    },
    [clearErrors, errors],
  );

  const handleUpLoadImageError = useCallback((error: string) => {
    Toast.show({ type: 'error', text1: error });
  }, []);

  const onSubmit = async (data: UserPayload) => {
    let avatarUrl = data.avatar;

    if (avatarUrl && !avatarUrl.startsWith('http')) {
      uploadImage(avatarUrl, {
        onSuccess: (uploadedUrl) => {
          avatarUrl = uploadedUrl;
        },
        onError: (error) => handleUpLoadImageError(error),
      });
    }

    onEdit({ ...data, avatar: avatarUrl });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Controller
        name="avatar"
        control={control}
        render={({ field: { onChange, value } }) => (
          <AvatarUploader avatar={value} onChange={onChange} />
        )}
      />
      <Text size="lg" style={styles.title}>
        Personal Details
      </Text>

      {/* Personal Details */}
      <View style={styles.profileWrapper}>
        <Controller
          name="email"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              label="Email Address"
              errorMessage={error?.message}
              onChangeText={handleInputChange('email', onChange)}
              returnKeyType="next"
              autoCapitalize="none"
              inputMode="email"
              value={value}
              editable={false}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              {...rest}
              ref={refs.username}
              label="Username"
              errorMessage={error?.message}
              onChangeText={handleInputChange('username', onChange)}
              returnKeyType="next"
              onSubmitEditing={getOnSubmitEditing('phoneNumber')}
            />
          )}
          rules={VALIDATION.USERNAME}
        />
      </View>

      {/* Business Address Details */}
      <Text style={styles.title} size="lg">
        Business Address Details
      </Text>
      <View style={styles.profileWrapper}>
        <Controller
          name="phoneNumber"
          control={control}
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <Input
              {...rest}
              ref={refs.phoneNumber}
              label="Phone Number"
              errorMessage={error?.message}
              onChangeText={handleInputChange('phoneNumber', onChange)}
              returnKeyType="next"
              keyboardType="phone-pad"
              onSubmitEditing={getOnSubmitEditing('address')}
              value={formatUSPhoneNumber(value || '')}
            />
          )}
          rules={VALIDATION.PHONE_NUMBER}
        />
        <Controller
          name="address"
          control={control}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              {...rest}
              ref={refs.address}
              label="Address"
              errorMessage={error?.message}
              onChangeText={handleInputChange('address', onChange)}
              returnKeyType="next"
              onSubmitEditing={getOnSubmitEditing('city')}
            />
          )}
          rules={VALIDATION.ADDRESS}
        />
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              {...rest}
              ref={refs.city}
              label="City"
              errorMessage={error?.message}
              onChangeText={handleInputChange('city', onChange)}
              returnKeyType="next"
            />
          )}
          rules={VALIDATION.CITY}
        />

        <Controller
          name="state"
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Dropdown
              data={US_STATES}
              label="State"
              onChange={onChange}
              value={value || ''}
              errorMessage={error?.message}
            />
          )}
          rules={VALIDATION.CITY}
        />

        <Controller
          name="zipCode"
          control={control}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              {...rest}
              ref={refs.zipCode}
              label="Zip Code"
              errorMessage={error?.message}
              onChangeText={handleInputChange('zipCode', onChange)}
              returnKeyType="next"
              inputMode="numeric"
              onSubmitEditing={getOnSubmitEditing('bankAccountNumber')}
            />
          )}
          rules={VALIDATION.CITY}
        />
      </View>

      {/* Bank Account Details */}
      <Text style={styles.title} size="lg">
        Bank Account Details
      </Text>
      <View style={styles.profileWrapper}>
        <Controller
          name="bankAccountNumber"
          control={control}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              {...rest}
              ref={refs.bankAccountNumber}
              label="Bank Account Number"
              errorMessage={error?.message}
              onChangeText={handleInputChange('bankAccountNumber', onChange)}
              returnKeyType="next"
              inputMode="numeric"
              onSubmitEditing={getOnSubmitEditing('accountHolderName')}
            />
          )}
          rules={VALIDATION.BANK_ACCOUNT_NUMBER}
        />
        <Controller
          name="accountHolderName"
          control={control}
          render={({ field: { onChange, ...rest }, fieldState: { error } }) => (
            <Input
              {...rest}
              ref={refs.accountHolderName}
              label="Account Holder’s Name"
              errorMessage={error?.message}
              onChangeText={handleInputChange('accountHolderName', onChange)}
              returnKeyType="next"
            />
          )}
          rules={VALIDATION.ACCOUNT_HOLDER_NAME}
        />
      </View>

      <Button
        title="Save"
        disabled={isLoading || !isDirty || !isValid}
        isLoading={isLoading || isUploading}
        style={styles.saveButton}
        onPress={handleSubmit(onSubmit)}
      />
    </KeyboardAwareScrollView>
  );
};

export const ProfileForm = memo(ProfileFormComponent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },

  title: {
    fontFamily: fontsFamily.semiBold,
    marginTop: 20,
  },

  profileWrapper: {
    marginTop: 20,
    gap: 28,
    paddingBottom: 36,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },

  saveButton: {
    height: 52,
    borderRadius: 8,
  },
});
