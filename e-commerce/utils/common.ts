import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
} from 'react-hook-form';
import { AxiosError } from 'axios';
import { findNodeHandle, LayoutRectangle, UIManager, View } from 'react-native';

// Constants
import { ERROR_MESSAGES } from '@/constants';

/**
 * Clear error message when the users typing
 */
export const clearErrorOnChange = <T extends FieldValues>(
  fieldName: Path<T>,
  errors: FieldErrors<T>,
  clearErrorFunc: UseFormClearErrors<T>,
): void => {
  errors[fieldName]?.message && clearErrorFunc(fieldName);
};

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

export const measureLayout = (
  ref: React.RefObject<View>,
): Promise<LayoutRectangle> => {
  return new Promise((resolve, reject) => {
    if (!ref.current) return reject('No ref found');

    const handle = findNodeHandle(ref.current);
    if (handle) {
      UIManager.measure(handle, (_x, _y, width, height, pageX, pageY) => {
        resolve({ x: pageX, y: pageY, width, height });
      });
    } else {
      reject('No handle found');
    }
  });
};
