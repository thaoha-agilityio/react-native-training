import { useMutation } from '@tanstack/react-query';

// Constants
import { ROUTES } from '@/constants';

// Interfaces
import { LoginPayload, LoginResponse } from '@/interfaces';

// Services
import { postData } from '@/services';

// Stores
import { useAuthStore } from '@/stores';

export const useAuthSignIn = () => {
  const [setAuthenticated, setAccessToken] = useAuthStore((state) => [
    state.setAuthenticated,
    state.setAccessToken,
  ]);

  return useMutation<LoginResponse, string, LoginPayload>({
    mutationFn: async (payload: LoginPayload) =>
      await postData(ROUTES.LOGIN, payload),

    onSuccess: async (res: LoginResponse) => {
      const { accessToken, user } = res || {};

      await setAccessToken(accessToken, user?.id);
      setAuthenticated(true);
    },
  });
};
