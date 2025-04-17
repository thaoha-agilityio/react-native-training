import {act, renderHook, waitFor} from 'test-utils';

// Hooks
import {useAuthSignIn} from '../useAuth';

// Services
import * as services from '@/services';

// Mocks
import {LOGIN_PAYLOAD, LOGIN_RESPONSE} from '@/mocks';

jest.mock('@/services', () => ({
  ...jest.requireActual('@/services'),
  getData: jest.fn,
  postData: jest.fn,
}));
jest.useFakeTimers();

describe('useAuthLogin', () => {
  it('sets the authenticated state and access token on successful login', async () => {
    const loginResponse = {
      data: LOGIN_RESPONSE,
      status: 200,
      statusText: 'OK',
      config: {},
    };
    jest.spyOn(services, 'postData').mockResolvedValue(loginResponse);

    const {result} = renderHook(() => useAuthSignIn(), {
      withQueryClient: true,
    });

    await act(async () => {
      await result.current.mutateAsync(LOGIN_PAYLOAD);
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(true);
    });
  });
});
