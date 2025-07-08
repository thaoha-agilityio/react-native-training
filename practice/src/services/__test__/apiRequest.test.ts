import axios from '../config';

// Services
import {getData, postData} from '../apiRequest';

// Mocks
import {MOCK_PRODUCTS} from '@/mocks';

jest.mock('../config');
describe('API request', () => {
  it('fetches successfully data from an API', async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: MOCK_PRODUCTS,
      headers: {'x-total-count': 2},
    });

    const result = await getData('/products');

    expect(result).toEqual({
      data: MOCK_PRODUCTS,
      totalCount: 2,
    });
  });

  it('handles an error when fetching data from an API', async () => {
    const errorMessage = 'Network Error';
    (axios.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await getData('/products');
    } catch (error) {
      expect((error as {message: string}).message).toBe(errorMessage);
    }
  });

  it('should return value when call postData success', async () => {
    (axios.post as jest.Mock).mockResolvedValue({
      data: MOCK_PRODUCTS[0],
    });

    const response = await postData('/posts', MOCK_PRODUCTS[0]);

    expect(response).toEqual(MOCK_PRODUCTS[0]);
  });

  it('should return error message when call postData failed', async () => {
    const errorMessage = 'Failed to post data';
    (axios.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

    try {
      await postData('/posts', MOCK_PRODUCTS[0]);
    } catch (error) {
      expect((error as {message: string}).message).toBe(errorMessage);
    }
  });
});
