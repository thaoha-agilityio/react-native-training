import { useContext } from 'react';

// Context
import { ThemeContext } from '../contexts';

// Themes
import { colorTheme } from '@/themes';

export const useTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const colors = colorTheme[theme];

  return {
    theme,
    toggleTheme,
    colors,
  };
};
