import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AxiosError} from 'axios';

// Constants
import {QUERY_KEYS, ROUTES} from '@/constants';

// Interfaces
import {User, UserPayload} from '@/interfaces';

// Services
import {DataResponse, getData, patchData} from '@/services';

// Stores
import {useAuthStore} from '@/stores';

export const useGetUser = (id: string) => {
  const token = useAuthStore(state => state.accessToken);

  const {data, ...rest} = useQuery<DataResponse<User>, AxiosError>({
    queryKey: [QUERY_KEYS.USER, id],
    queryFn: async () => await getData(`${ROUTES.USERS}/${id}`, token),
  });

  return {
    ...rest,
    user: data?.data,
  };
};

export const useEditUser = (id: string) => {
  const token = useAuthStore(state => state.accessToken);
  const queryClient = useQueryClient();

  return useMutation<User, string, UserPayload>({
    mutationFn: async (payload: UserPayload) =>
      await patchData(`${ROUTES.USERS}/${id}`, payload, token),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.USER, id]});
    },
  });
};
