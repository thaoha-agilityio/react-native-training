import { renderHook, waitFor } from 'test-utils';

// Hooks
import { useFetchProductDetails, useInfiniteProducts } from '../useProducts';

// Constants
import { MOCK_PRODUCTS } from '@/mocks';

// Services
import * as services from '@/services';

jest.mock('@/services', () => ({
  ...jest.requireActual('@/services'),
  getData: jest.fn,
  postData: jest.fn,
}));
jest.useFakeTimers();

describe('Test useFetchProduct', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should return data and isSuccess is true when call useInfiniteProducts success', async () => {
    const mockProductsResponse = {
      data: MOCK_PRODUCTS,
      totalCount: 2,
    };

    jest.spyOn(services, 'getData').mockResolvedValue(mockProductsResponse);
    const { result } = renderHook(() => useInfiniteProducts(1), {
      withQueryClient: true,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(true);
    });

    result.current.fetchNextPage();
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('Should return data when call useFetchProductDetail success', async () => {
    const mockProductsResponse = {
      data: MOCK_PRODUCTS[0],
      totalCount: 1,
    };
    jest.spyOn(services, 'getData').mockResolvedValue(mockProductsResponse);
    const { result } = renderHook(() => useFetchProductDetails('1'), {
      withQueryClient: true,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toEqual(true);
    });
  });
});
