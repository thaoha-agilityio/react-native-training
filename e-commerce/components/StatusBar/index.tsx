import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// Hooks
import { useTheme } from '@/hooks';

export const StatusBar = () => {
  const { colors, theme } = useTheme();

  return (
    <ExpoStatusBar
      style={theme === 'light' ? 'dark' : 'light'}
      backgroundColor={colors.bottomTab}
    />
  );
};
