import {act, renderHook, waitFor} from 'test-utils';

// Hooks
import {useOrderCreated} from '../useOrder';

// Services
import * as services from '@/services';

// Mocks
import {MOCK_ORDERS, ORDER_PAYLOAD} from '@/mocks';

jest.mock('@/services', () => ({
  ...jest.requireActual('@/services'),
  postData: jest.fn,
}));
jest.useFakeTimers();

describe('useOrderCreated', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should call postData with correct data', async () => {
    const OrderResponse = {
      data: MOCK_ORDERS[0],
      status: 200,
      statusText: 'OK',
      config: {},
    };
    jest.spyOn(services, 'postData').mockResolvedValue(OrderResponse);

    const {result} = renderHook(() => useOrderCreated(), {
      withQueryClient: true,
    });

    await act(async () => {
      await result.current.mutateAsync(ORDER_PAYLOAD);
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(false);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(true);
    });
  });
});
