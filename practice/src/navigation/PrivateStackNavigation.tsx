import {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Types
import {AppStackParamList} from '@/interfaces';

// Constants
import {SCREENS} from '@/constants';

// Screens
import {
  SuccessScreen,
  ProductDetailsScreen,
  CartScreen,
  CheckOutScreen,
  EditProfileScreen,
  NotFound,
} from '@/screens';
import {BottomTabNavigation} from './BottomTabNavigation';

// Utils
import {handleNotificationPermission} from '@/utils';

const PrivateStack = createNativeStackNavigator<AppStackParamList>();
export const PrivateNavigator = () => {
  useEffect(() => {
    handleNotificationPermission();
  }, []);

  return (
    <PrivateStack.Navigator initialRouteName={SCREENS.BOTTOM_TAB}>
      <PrivateStack.Group screenOptions={{headerShown: false}}>
        <PrivateStack.Screen
          name={SCREENS.BOTTOM_TAB}
          component={BottomTabNavigation}
        />
        <PrivateStack.Screen name={SCREENS.SUCCESS} component={SuccessScreen} />
        <PrivateStack.Screen
          name={SCREENS.PRODUCT_DETAILS}
          component={ProductDetailsScreen}
        />
        <PrivateStack.Screen name={SCREENS.CART} component={CartScreen} />
        <PrivateStack.Screen
          name={SCREENS.CHECK_OUT}
          component={CheckOutScreen}
        />
        <PrivateStack.Screen
          options={{
            headerBackButtonMenuEnabled: true,
            headerShown: true,
            title: 'Edit Profile',
          }}
          name={SCREENS.EDIT_PROFILE}
          component={EditProfileScreen}
        />
        <PrivateStack.Screen name={SCREENS.NOT_FOUND} component={NotFound} />
      </PrivateStack.Group>
    </PrivateStack.Navigator>
  );
};
