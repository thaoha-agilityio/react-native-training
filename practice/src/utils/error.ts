import {AxiosError} from 'axios';

// Constants
import {ERROR_MESSAGES} from '@/constants';

/**
 * Retrieves the appropriate error message from an Axios error response or provides a default message.
 *
 * @param {unknown} error - The error object.
 * @returns {string} - The error message.
 */
export const getAPIErrorMessage = (error: unknown): string => {
  // Check if the error is an AxiosError with a data response,
  // and if so, if the data is a string. If true, return the data, otherwise return the default API error message.
  return error instanceof AxiosError &&
    error.response?.data &&
    typeof error.response.data === 'string'
    ? error.response.data
    : ERROR_MESSAGES.DEFAULT_API_ERROR;
};
