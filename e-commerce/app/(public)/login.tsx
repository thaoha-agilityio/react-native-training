import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';

// Components
import { LoginForm, Text } from '@/components';

// Constants
import { ROUTES } from '@/constants';

// Hooks
import { useAuthSignIn } from '@/hooks';

// Utils
import { getAPIErrorMessage } from '@/utils';

// Types
import { LoginPayload } from '@/interfaces';

const LoginScreen = () => {
  const { mutate: signIn, isPending } = useAuthSignIn();
  const router = useRouter();

  const handleLoginSuccess = useCallback(() => {
    router.replace(ROUTES.HOME);
  }, [router]);

  const handleLoginError = useCallback((error: string) => {
    console.log(getAPIErrorMessage(error));
  }, []);

  const handleLogin = useCallback(
    async (data: LoginPayload) => {
      signIn(data, {
        onSuccess: handleLoginSuccess,
        onError: (error) => {
          handleLoginError(error);
        },
      });
    },
    [handleLoginError, handleLoginSuccess, signIn],
  );

  return (
    <View style={styles.container}>
      <Text variant="title" size="3xl" style={styles.title} numberOfLines={2}>
        Welcome Back!
      </Text>
      <View style={styles.wrapper}>
        <LoginForm onsubmit={handleLogin} isLoading={isPending} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 19,
  },

  title: {
    width: '80%',
  },

  wrapper: {
    marginTop: 36,
  },
});
