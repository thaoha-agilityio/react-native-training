import { Ref, forwardRef, memo, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

// Components
import { Input, TextInputProps } from '@/components';
import { EyeIcon, EyeSlashIcon, LockIcon } from '@/components/icons';

const PasswordInputComponent = forwardRef(
  ({ ...props }: TextInputProps, ref: Ref<TextInput>) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

    const handleShowHidePassword = () => setIsShowPassword((prev) => !prev);

    return (
      <Input
        ref={ref}
        variant="subtle"
        startContent={<LockIcon />}
        endContent={
          <TouchableOpacity
            onPress={handleShowHidePassword}
            testID="toggle-password"
          >
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

PasswordInputComponent.displayName = 'PasswordInputComponent';
export const PasswordInput = memo(PasswordInputComponent);

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});
