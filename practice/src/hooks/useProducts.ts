import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';

// Constants
import {QUERY_KEYS, ROUTES} from '@/constants';

// Services
import {DataResponse, getData} from '@/services';

// Interfaces
import {Product} from '@/interfaces';

export const useInfiniteProducts = (limit: number) => {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, ...rest} =
    useInfiniteQuery<DataResponse<Product[]>, AxiosError>({
      queryKey: [QUERY_KEYS.PRODUCTS, limit],
      queryFn: async ({pageParam = 1}) => {
        const queryParams = new URLSearchParams({
          _page: String(pageParam),
          _limit: String(limit),
        }).toString();

        return getData(`${ROUTES.PRODUCTS}?${queryParams}`);
      },
      getNextPageParam: (lastPage, allPages) => {
        const totalCount = lastPage.totalCount ?? 0;
        const totalPages = Math.ceil(totalCount / limit);
        const currentPage = allPages.length;

        // If there are more pages to load, return the next page number; otherwise, return undefined
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
      enabled: true,
      initialPageParam: 1,
    });

  return {
    data: data?.pages.flatMap(page => page.data) || [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
};

export const useFetchProductDetails = (id: string) => {
  const {data, ...rest} = useQuery<DataResponse<Product>, AxiosError>({
    queryKey: [QUERY_KEYS.PRODUCT + id],
    queryFn: async () => await getData(`${ROUTES.PRODUCTS}/${id}`),
  });

  return {
    ...rest,
    product: data?.data,
  };
};
