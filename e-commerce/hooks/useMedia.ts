import { useWindowDimensions } from 'react-native';

// Hooks
import { MEDIA_SCREEN } from '@/constants';

export const useMedia = () => {
  const { width } = useWindowDimensions();

  return {
    width,
    isMobile: width < MEDIA_SCREEN.TABLET,
    isTablet: width >= MEDIA_SCREEN.TABLET,
  };
};
