import { Redirect } from 'expo-router';

// Stores
import { useAuthStore, useBootstrapsStore } from '@/stores';

// Constants
import { ROUTES } from '@/constants';

const Screen = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isFirstLoad = useBootstrapsStore((state) => state.isFirstLoad);

  if (isFirstLoad) {
    return <Redirect href={ROUTES.ONBOARDING} />;
  }

  return isAuthenticated ? (
    <Redirect href={ROUTES.HOME} />
  ) : (
    <Redirect href={ROUTES.LOGIN} />
  );
};

export default Screen;
