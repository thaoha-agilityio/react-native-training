import { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

const THEME_STORAGE_KEY = '@app_theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadSavedTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadSavedTheme = async () => {
    const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Use system theme as default if no saved theme
      setTheme(systemColorScheme || 'light');
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
