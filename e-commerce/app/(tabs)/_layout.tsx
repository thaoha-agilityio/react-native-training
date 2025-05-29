import { Tabs } from 'expo-router';

// Hooks
import { useTheme } from '@/hooks';

// Themes
import { colors } from '@/themes';

// Constants
import { TAB_SCREENS } from '@/constants';

// Components
import { Header } from '@/components';

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
      {TAB_SCREENS.map(({ name, title, Icon, isCart, isSetting }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ focused }) => (
              <Icon color={focused ? colors.primary : colorTheme.default} />
            ),
            ...(isCart && {
              tabBarIconStyle: {
                width: 54,
                height: 56,
                borderRadius: 50,
                position: 'absolute',
                boxShadow: '#8A959E1F 1px 2px 2px 1px',
                top: -18,
                backgroundColor: colorTheme.background,
              },
            }),
            ...(isSetting && {
              headerShown: true,
              header: ({ ...props }) => <Header {...props} />,
            }),
          }}
        />
      ))}
    </Tabs>
  );
}
