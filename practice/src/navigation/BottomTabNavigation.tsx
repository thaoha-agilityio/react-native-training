// Libs
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Constants
import {SCREENS} from '@/constants';

// Screens
import {
  FavoritesScreen,
  HomeScreen,
  NotificationsScreen,
  ProfileScreen,
} from '@/screens';

// Icons
import {BellIcon, HomeIcon, MarkerIcon, ProfileIcon} from '@/components/icons';

// Types
import {BottomTabParamList} from '@/interfaces';

// Themes
import {colors} from '@/themes';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const renderTabBarIcon =
  (screen: keyof BottomTabParamList) =>
  ({focused}: {focused: boolean}) => {
    switch (screen) {
      case SCREENS.HOME:
        return (
          <HomeIcon
            fill={focused ? colors.primary : 'none'}
            color={focused ? colors.primary : colors.disabled}
          />
        );

      case SCREENS.FAVORITES:
        return (
          <MarkerIcon
            fill={focused ? colors.primary : 'none'}
            color={focused ? colors.primary : colors.disabled}
          />
        );

      case SCREENS.NOTIFICATIONS:
        return (
          <BellIcon
            fill={focused ? colors.primary : 'none'}
            color={focused ? colors.primary : colors.disabled}
          />
        );

      case SCREENS.PROFILE:
        return (
          <ProfileIcon color={focused ? colors.primary : colors.disabled} />
        );

      default:
        return null;
    }
  };

export const BottomTabNavigation = () => (
  <Tab.Navigator
    initialRouteName={SCREENS.HOME}
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingTop: 10,
        paddingBottom: 50,
      },
    }}>
    <Tab.Screen
      name={SCREENS.HOME}
      component={HomeScreen}
      options={{tabBarIcon: renderTabBarIcon(SCREENS.HOME)}}
    />
    <Tab.Screen
      name={SCREENS.FAVORITES}
      component={FavoritesScreen}
      options={{tabBarIcon: renderTabBarIcon(SCREENS.FAVORITES)}}
    />
    <Tab.Screen
      name={SCREENS.NOTIFICATIONS}
      component={NotificationsScreen}
      options={{tabBarIcon: renderTabBarIcon(SCREENS.NOTIFICATIONS)}}
    />
    <Tab.Screen
      name={SCREENS.PROFILE}
      component={ProfileScreen}
      options={{tabBarIcon: renderTabBarIcon(SCREENS.PROFILE)}}
    />
  </Tab.Navigator>
);
