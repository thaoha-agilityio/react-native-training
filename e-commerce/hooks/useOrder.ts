import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

// Constants
import { ENDPOINTS } from '@/constants';

// Interfaces
import { Order, OrderCreatePayload } from '@/interfaces';

// Services
import { postData } from '@/services';

export const useOrderCreated = () => {
  return useMutation<Order, AxiosError, OrderCreatePayload>({
    mutationFn: async (payload: OrderCreatePayload) =>
      await postData(ENDPOINTS.ORDERS, payload),
  });
};
