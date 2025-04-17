import {LinkingOptions} from '@react-navigation/native';

// Constants
import {SCREENS} from './screens';

export const APP_SCHEME = 'furniture-store://';

export const config: LinkingOptions<ReactNavigation.RootParamList>['config'] = {
  screens: {
    // Public
    [SCREENS.BOARDING]: {
      path: SCREENS.BOARDING,
    },
    [SCREENS.LOGIN]: {
      path: SCREENS.LOGIN,
    },

    // Private
    [SCREENS.HOME]: {
      path: SCREENS.HOME,
    },
    [SCREENS.CART]: {
      path: SCREENS.CART,
    },
    [SCREENS.PRODUCT_DETAILS]: {
      path: `${SCREENS.PRODUCT_DETAILS}/:id`,
    },
    [SCREENS.EDIT_PROFILE]: {
      path: SCREENS.EDIT_PROFILE,
    },

    // BottomTab
    [SCREENS.BOTTOM_TAB]: {
      screens: {
        [SCREENS.FAVORITES]: {
          path: SCREENS.FAVORITES,
        },
        [SCREENS.NOTIFICATIONS]: {
          path: SCREENS.NOTIFICATIONS,
        },
        [SCREENS.PROFILE]: {
          path: SCREENS.PROFILE,
        },
      },
    },

    [SCREENS.NOT_FOUND]: {
      path: '*',
    },
  },
};
