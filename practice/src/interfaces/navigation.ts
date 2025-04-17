import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorScreenParams} from '@react-navigation/native';

// Constants
import {SCREENS} from '@/constants';

export type AppStackParamList = {
  [SCREENS.LOGIN]: undefined;
  [SCREENS.BOARDING]: undefined;
  [SCREENS.SUCCESS]: undefined;
  [SCREENS.HOME]: undefined;
  [SCREENS.PRODUCT_DETAILS]: {
    id: string;
  };
  [SCREENS.CART]: undefined;
  [SCREENS.CHECK_OUT]: undefined;
  [SCREENS.BOTTOM_TAB]: NavigatorScreenParams<BottomTabParamList>;
  [SCREENS.EDIT_PROFILE]: undefined;
  [SCREENS.PROFILE]: undefined;
  [SCREENS.AUTH_STACK]: undefined;
  [SCREENS.PRIVATE_STACK]: undefined;
  [SCREENS.NOT_FOUND]: undefined;
};

export type BottomTabParamList = {
  [SCREENS.HOME]: undefined;
  [SCREENS.FAVORITES]: undefined;
  [SCREENS.NOTIFICATIONS]: undefined;
  [SCREENS.PROFILE]: undefined;
};

// AppStack
export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;
