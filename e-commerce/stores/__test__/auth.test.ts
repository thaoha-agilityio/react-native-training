// Libs
import * as SecureStore from 'expo-secure-store';

import { act, renderHook } from 'test-utils';

// Hooks
import { useAuthStore } from '..';

describe('useAuthStore hook', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should initial state', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.userId).toEqual('');
    expect(result.current.accessToken).toBe('');
    expect(result.current.isAuthenticated).toBeFalsy();
  });

  it('should set authenticated correctly', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setAuthenticated(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
  });

  it.skip('should save and set accessToken', async () => {
    (SecureStore.setItem as jest.Mock).mockResolvedValue(undefined);

    await act(async () => {
      await useAuthStore.getState().setAccessToken('token-abc', 'user-456');
    });

    expect(SecureStore.setItem).toHaveBeenCalledWith(
      'auth',
      JSON.stringify({ accessToken: 'token-abc', userId: 'user-456' }),
      { service: expect.any(String) },
    );

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('token-abc');
    expect(state.userId).toBe('user-456');
    expect(state.isAuthenticated).toBe(true);
  });

  it.skip('should load accessToken from Keychain', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue({
      username: 'auth',
      password: JSON.stringify({
        accessToken: 'token-loaded',
        userId: 'user-loaded',
      }),
    });

    await act(async () => {
      await useAuthStore.getState().loadAccessTokenFromStorage();
    });

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('token-loaded');
    expect(state.userId).toBe('user-loaded');
    expect(state.isAuthenticated).toBe(true);
  });

  it.skip('should clear auth', async () => {
    (SecureStore.deleteItemAsync as jest.Mock).mockResolvedValue(true);

    // First, set a state
    act(() => {
      useAuthStore.setState({
        isAuthenticated: true,
        accessToken: 'some-token',
        userId: 'some-user',
      });
    });

    await act(async () => {
      await useAuthStore.getState().clearAuth();
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.accessToken).toBe('');
    expect(state.userId).toBe('');
    expect(SecureStore.deleteItemAsync).toHaveBeenCalled();
  });
});
