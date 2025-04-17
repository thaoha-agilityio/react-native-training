import {Ref, forwardRef, memo, useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';

// Components
import {Input, TextInputProps} from '@/components';
import {EyeIcon, EyeSlashIcon} from '@/components/icons';

const PasswordInputComponent = forwardRef(
  ({...props}: TextInputProps, ref: Ref<TextInput>) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleShowHidePassword = () => setIsShowPassword(prev => !prev);

    return (
      <Input
        ref={ref}
        label="Password"
        endContent={
          <TouchableOpacity
            onPress={handleShowHidePassword}
            testID="toggle-password"
            style={styles.eyeButton}>
            {isShowPassword ? <EyeIcon /> : <EyeSlashIcon />}
          </TouchableOpacity>
        }
        secureTextEntry={!isShowPassword}
        style={styles.text}
        {...props}
      />
    );
  },
);

export const PasswordInput = memo(PasswordInputComponent);

const styles = StyleSheet.create({
  eyeButton: {
    paddingRight: 20,
  },

  text: {
    color: 'black',
  },
});
