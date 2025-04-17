import {ScrollView, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useCallback} from 'react';

// Components
import {Text, LoginForm} from '@/components';
import {FurnitureIcon} from '@/components/icons';

// Styles
import {loginScreenStyles} from './styles';

// Hooks
import {useAuthSignIn} from '@/hooks';

// Interfaces
import {AppStackScreenProps, LoginPayload} from '@/interfaces';

// Constants
import {SCREENS} from '@/constants';

// Utils
import {getAPIErrorMessage} from '@/utils';

type LoginScreenProps = AppStackScreenProps<typeof SCREENS.LOGIN>;

export const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {mutate: signIn, isPending} = useAuthSignIn();

  const handleLoginSuccess = useCallback(() => {
    navigation.navigate(SCREENS.HOME);
  }, [navigation]);

  const handleLoginError = useCallback((error: string) => {
    Toast.show({type: 'error', text1: getAPIErrorMessage(error)});
  }, []);

  const handleLogin = useCallback(
    async (data: LoginPayload) => {
      signIn(data, {
        onSuccess: handleLoginSuccess,
        onError: error => {
          handleLoginError(error);
        },
      });
    },
    [handleLoginError, handleLoginSuccess, signIn],
  );

  return (
    <ScrollView
      style={loginScreenStyles.container}
      keyboardShouldPersistTaps="handled">
      <View style={loginScreenStyles.headerWrapper}>
        <View style={loginScreenStyles.divider} />
        <FurnitureIcon />
        <View style={loginScreenStyles.divider} />
      </View>
      <View style={loginScreenStyles.form}>
        <View style={loginScreenStyles.textWrapper}>
          <Text size="xxl" style={loginScreenStyles.heading}>
            Hello ! {'\n'}
            <Text variant="title" size="xl" style={loginScreenStyles.title}>
              welcome back
            </Text>
          </Text>
        </View>

        <LoginForm onsubmit={handleLogin} isLoading={isPending} />
      </View>
    </ScrollView>
  );
};
