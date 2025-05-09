import { AxiosRequestConfig } from 'axios';
import axios from './config';

export const postData = async <T, R>(
  url: string,
  arg: T,
  configs?: AxiosRequestConfig,
): Promise<R> => {
  const response = await axios.post<R>(url, arg, { ...configs });

  return response.data;
};

export type DataResponse<T> = {
  data: T;
  totalCount: number;
};

export const getData = async <T>(
  url: string,
  token?: string,
): Promise<DataResponse<T>> => {
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const totalCount = Number(response.headers['x-total-count']);

  return {
    data: response.data,
    totalCount,
  };
};

export const patchData = async <T, R>(
  url: string,
  arg: T,
  token?: string,
): Promise<R> => {
  const response = await axios.patch<R>(url, arg, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
