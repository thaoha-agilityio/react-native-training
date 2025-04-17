import {APP_SCHEME, SCREENS} from '@/constants';
import {generateDeepLink} from '../linking';

describe('generateDeepLink', () => {
  it('should return the original deepLink if authenticated', () => {
    const deepLink = `${APP_SCHEME}${SCREENS.PROFILE}`;
    const result = generateDeepLink(true, deepLink);
    expect(result).toBe(deepLink);
  });

  it('should return login link if not authenticated', () => {
    const deepLink = `${APP_SCHEME}${SCREENS.PROFILE}`;
    const result = generateDeepLink(false, deepLink);
    expect(result).toBe(`${APP_SCHEME}${SCREENS.LOGIN}`);
  });
});
