import { useColorScheme } from '@/hooks/useColorScheme';
import { colorTheme } from '@/themes';

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof colorTheme.light & keyof typeof colorTheme.dark,
) => {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  return colorFromProps ? colorFromProps : colorTheme[theme][colorName];
};
