// Stores
import {useAuthStore} from '@/stores';

// Screens
import {PrivateNavigator} from './PrivateStackNavigation';
import {AuthStackNavigation} from './AuthStackNavigation';

export const AppStackNavigation = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return isAuthenticated ? <PrivateNavigator /> : <AuthStackNavigation />;
};
