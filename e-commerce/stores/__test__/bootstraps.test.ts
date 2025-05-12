import { act, renderHook } from 'test-utils';

import { useBootstrapsStore } from '..';

describe('useBootstrapsStore hook', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should initial state', () => {
    const { result } = renderHook(() => useBootstrapsStore());

    expect(result.current.isFirstLoad).toBeTruthy();
  });

  it('should set isFirstLoad correctly', () => {
    const { result } = renderHook(() => useBootstrapsStore());

    act(() => {
      result.current.setIsFirstLoad(false);
    });

    expect(result.current.isFirstLoad).toBe(false);
  });
});
