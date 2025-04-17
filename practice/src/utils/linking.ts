import {APP_SCHEME, SCREENS} from '@/constants';

export const generateDeepLink = (
  isAuthenticated: boolean,
  deepLink: string,
) => {
  return isAuthenticated ? deepLink : `${APP_SCHEME}${SCREENS.LOGIN}`;
};
