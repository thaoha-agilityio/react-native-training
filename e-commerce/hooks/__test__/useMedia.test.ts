import { useWindowDimensions } from 'react-native';
import { renderHook } from '@/test-utils';

// Hooks
import { useMedia } from '../useMedia';

// Constants
import { MEDIA_SCREEN } from '@/constants';

const mockUseWindowDimensions = jest.fn();
jest.mock('react-native/Libraries/Utilities/useWindowDimensions', () => ({
  default: mockUseWindowDimensions,
}));

describe('useMedia', () => {
  it('should return isMobile = true when width is smaller than TABLET size', () => {
    (useWindowDimensions as jest.Mock).mockReturnValue({
      width: MEDIA_SCREEN.MOBILE,
    });

    const { result } = renderHook(() => useMedia());

    expect(result.current.width).toBe(MEDIA_SCREEN.MOBILE);
    expect(result.current.isMobile).toBe(true);
    expect(result.current.isTablet).toBe(false);
  });

  it('should return isTablet = true when width is TABLET size or larger', () => {
    (useWindowDimensions as jest.Mock).mockReturnValue({
      width: MEDIA_SCREEN.TABLET,
    });

    const { result } = renderHook(() => useMedia());

    expect(result.current.width).toBe(MEDIA_SCREEN.TABLET);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTablet).toBe(true);
  });
});
