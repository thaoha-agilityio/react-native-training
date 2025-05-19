import { Tabs } from 'expo-router';

// Hooks
import { useColorScheme } from '@/hooks/useColorScheme';

// Components
import {
  CartBottomBarIcon,
  HeartIcon,
  HomeIcon,
  SearchBarIcon,
  SettingIcon,
} from '@/components/icons';

// Themes
import { colors, colorTheme } from '@/themes';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colorTheme[colorScheme].default,
        headerShown: false,
        tabBarStyle: {
          height: 84,
          paddingTop: 11,
          paddingBottom: 22,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              color={focused ? colors.primary : colorTheme[colorScheme].default}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused }) => (
            <HeartIcon
              color={focused ? colors.primary : colorTheme[colorScheme].default}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <CartBottomBarIcon
              color={focused ? colors.primary : colorTheme[colorScheme].default}
            />
          ),
          tabBarIconStyle: {
            width: 54,
            height: 56,
            borderRadius: 50,
            position: 'absolute',
            boxShadow: '#8A959E1F 1px 2px 2px 1px',
            top: -18,
            backgroundColor: colorTheme[colorScheme].background,
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <SearchBarIcon
              color={focused ? colors.primary : colorTheme[colorScheme].default}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ focused }) => (
            <SettingIcon
              color={focused ? colors.primary : colorTheme[colorScheme].default}
            />
          ),
        }}
      />
    </Tabs>
  );
}
