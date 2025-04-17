import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Types
import {AppStackParamList} from '@/interfaces';

// Screens
import {BoardingScreen, LoginScreen} from '@/screens';

const AuthStack = createNativeStackNavigator<AppStackParamList>();

export const AuthStackNavigation = () => (
  <AuthStack.Navigator screenOptions={{headerShown: false}}>
    <AuthStack.Screen name="Boarding" component={BoardingScreen} />
    <AuthStack.Screen name="Login" component={LoginScreen} />
  </AuthStack.Navigator>
);
