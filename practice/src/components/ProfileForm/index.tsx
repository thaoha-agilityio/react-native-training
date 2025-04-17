import {memo, useCallback, useRef, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Controller, useForm} from 'react-hook-form';
import Toast from 'react-native-toast-message';

// Components
import {Input} from '../Input';
import {Button} from '../Button';
import {AvatarUploader} from '../AvatarUploader';

// Themes
import {colors} from '@/themes';

// Types
import {UserPayload} from '@/interfaces';

// Constants
import {FORM_VALIDATION_MESSAGE, REGEX} from '@/constants';

// Utils
import {clearErrorOnChange, getAPIErrorMessage, isAtLeast18} from '@/utils';

// Hooks
import {useUploadImage} from '@/hooks';

interface ProfileFormProps {
  isLoading?: boolean;
  email: string;
  username: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  avatar?: string;
  onEdit: (payload: UserPayload) => void;
}

const ProfileFormComponent = ({
  email,
  username,
  phoneNumber,
  dateOfBirth,
  avatar,
  isLoading,
  onEdit,
}: ProfileFormProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    getValues,
    formState: {errors, isDirty},
  } = useForm<UserPayload>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email,
      username,
      phoneNumber,
      dateOfBirth,
      avatar,
    },
  });

  const [isOpen, setOpen] = useState(false);

  const handleSelectedDate = (
    dateTime: Date,
    onChange: (value: string) => void,
  ) => {
    setOpen(false);
    onChange(dateTime.toISOString());
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const PROFILE_FORM_VALIDATION = {
    USERNAME: {
      required: FORM_VALIDATION_MESSAGE.REQUIRED('Name'),
      pattern: {
        value: REGEX.NAME,
        message: FORM_VALIDATION_MESSAGE.INVALID('Name'),
      },
    },
    PHONE_NUMBER: {
      pattern: {
        value: REGEX.PHONE_NUMBER,
        message: FORM_VALIDATION_MESSAGE.INVALID('Phone number'),
      },
    },
    BIRTH_DATE: {
      validate: {
        laterThanCurrentTime: () => {
          const value = getValues('dateOfBirth');
          if (!value) return true;

          return isAtLeast18(value)
            ? true
            : FORM_VALIDATION_MESSAGE.DATE_OF_BIRTH_INVALID;
        },
      },
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

  const {mutate: uploadImage, isPending: isUploading} = useUploadImage();

  const handleUpLoadImageError = useCallback((error: string) => {
    Toast.show({type: 'error', text1: getAPIErrorMessage(error)});
  }, []);

  const onSubmit = async (data: UserPayload) => {
    let avatarUrl = data.avatar;

    if (avatarUrl && !avatarUrl.startsWith('http')) {
      uploadImage(avatarUrl, {
        onSuccess: uploadedUrl => {
          avatarUrl = uploadedUrl;
        },
        onError: error => handleUpLoadImageError(error),
      });
    }

    onEdit({...data, avatar: avatarUrl});
  };

  const usernameRef = useRef<TextInput>(null);
  const phoneNumberRef = useRef<TextInput>(null);

  const handleFocusPhoneNumber = useCallback(() => {
    phoneNumberRef.current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <Controller
        name="avatar"
        control={control}
        render={({field: {onChange, value}}) => (
          <AvatarUploader avatar={value} onChange={onChange} />
        )}
      />
      <View style={styles.input}>
        <Controller
          name="email"
          control={control}
          render={({
            field: {onChange, value, ...rest},
            fieldState: {error},
          }) => (
            <Input
              {...rest}
              label="Email"
              variant="outline"
              errorMessage={error?.message}
              editable={false}
              onChangeText={handleInputChange('email', onChange)}
              value={value}
              style={styles.email}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({field: {onChange, ...rest}, fieldState: {error}}) => (
            <Input
              {...rest}
              ref={usernameRef}
              label="Name"
              variant="outline"
              errorMessage={error?.message}
              onChangeText={handleInputChange('username', onChange)}
              returnKeyType="next"
              onSubmitEditing={handleFocusPhoneNumber}
            />
          )}
          rules={PROFILE_FORM_VALIDATION.USERNAME}
        />
        <Controller
          name="phoneNumber"
          control={control}
          render={({field: {onChange, ...rest}, fieldState: {error}}) => (
            <Input
              {...rest}
              ref={phoneNumberRef}
              label="Phone number"
              variant="outline"
              errorMessage={error?.message}
              onChangeText={handleInputChange('phoneNumber', onChange)}
              returnKeyType="next"
              keyboardType="phone-pad"
            />
          )}
          rules={PROFILE_FORM_VALIDATION.PHONE_NUMBER}
        />

        <Controller
          name="dateOfBirth"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => {
            return (
              <>
                <Input
                  label="Birth date"
                  variant="outline"
                  value={
                    value ? new Date(value).toLocaleDateString('en-US') : ''
                  }
                  placeholder="mm/dd/yyyy"
                  onPress={handleOpenModal} // Opens date picker
                  placeholderTextColor={colors.text.secondary}
                  errorMessage={error?.message}
                />

                <DatePicker
                  modal
                  mode="date"
                  open={isOpen}
                  date={value ? new Date(value) : new Date()}
                  onConfirm={selectedDate => {
                    handleSelectedDate(selectedDate, onChange);
                  }}
                  onCancel={handleCloseModal}
                  maximumDate={new Date()}
                />
              </>
            );
          }}
          rules={PROFILE_FORM_VALIDATION.BIRTH_DATE}
        />
      </View>

      <Button
        disabled={isLoading || !isDirty}
        isLoading={isLoading || isUploading}
        style={styles.submitButton}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};

export const ProfileForm = memo(ProfileFormComponent);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 35,
    backgroundColor: colors.light,
  },

  input: {gap: 15},
  text: {
    color: 'red',
  },

  submitButton: {
    marginTop: 40,
    marginBottom: 30,
    marginHorizontal: 30,
    height: 50,
  },

  email: {
    backgroundColor: colors.background.disable,
  },
});
