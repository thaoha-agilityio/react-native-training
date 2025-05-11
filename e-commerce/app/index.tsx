import { Redirect } from 'expo-router';

// Stores
import { useAuthStore } from '@/stores';
import { ROUTES } from '@/constants';

const Screen = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? (
    <Redirect href={ROUTES.HOME} />
  ) : (
    <Redirect href={ROUTES.LOGIN} />
  );
};

export default Screen;
