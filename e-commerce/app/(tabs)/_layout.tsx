import { Tabs } from 'expo-router';

// Components
import {
  CartBottomBarIcon,
  HeartIcon,
  HomeIcon,
  SearchBarIcon,
  SettingIcon,
} from '@/components/icons';

// Hooks
import { useTheme } from '@/hooks';

// Themes
import { colors } from '@/themes';

export default function TabLayout() {
  const { colors: colorTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colorTheme.default,
        headerShown: false,
        tabBarStyle: {
          height: 84,
          paddingTop: 11,
          paddingBottom: 22,
          backgroundColor: colorTheme.bottomTab,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <HomeIcon color={focused ? colors.primary : colorTheme.default} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused }) => (
            <HeartIcon color={focused ? colors.primary : colorTheme.default} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <CartBottomBarIcon
              color={focused ? colors.primary : colorTheme.default}
            />
          ),
          tabBarIconStyle: {
            width: 54,
            height: 56,
            borderRadius: 50,
            position: 'absolute',
            boxShadow: '#8A959E1F 1px 2px 2px 1px',
            top: -18,
            backgroundColor: colorTheme.background,
          },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <SearchBarIcon
              color={focused ? colors.primary : colorTheme.default}
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
              color={focused ? colors.primary : colorTheme.default}
            />
          ),
        }}
      />
    </Tabs>
  );
}
