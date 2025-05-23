import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

// Components
import { LoginForm, Text } from '@/components';

// Constants
import { ROUTES } from '@/constants';

// Hooks
import { useAuthSignIn, useMedia } from '@/hooks';

// Utils
import { getAPIErrorMessage } from '@/utils';

// Types
import { LoginPayload } from '@/interfaces';

export const Login = () => {
  const { mutate: signIn, isPending } = useAuthSignIn();
  const router = useRouter();
  const { isTablet } = useMedia();

  const handleLoginSuccess = useCallback(() => {
    router.replace(ROUTES.HOME);
  }, [router]);

  const handleLoginError = useCallback((error: string) => {
    Toast.show({ type: 'error', text1: getAPIErrorMessage(error) });
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

  const marginTop = isTablet ? 200 : 20;
  const paddingHorizontal = isTablet ? 100 : 32;

  return (
    <ScrollView
      style={[
        styles.container,
        { marginTop: marginTop, paddingHorizontal: paddingHorizontal },
      ]}
    >
      <Text variant="title" size="3xl" style={styles.title} numberOfLines={2}>
        Welcome Back!
      </Text>
      <View style={styles.wrapper}>
        <LoginForm onsubmit={handleLogin} isLoading={isPending} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    width: '80%',
  },

  wrapper: {
    marginTop: 36,
  },
});
