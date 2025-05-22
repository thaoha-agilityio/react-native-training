import { FieldErrors } from 'react-hook-form';
import { AxiosError, AxiosRequestHeaders } from 'axios';

// Utils
import { clearErrorOnChange, getAPIErrorMessage } from '../common';

// Constants
import { ERROR_MESSAGES } from '@/constants';

describe('clearErrorOnChange function', () => {
  const mockClearError = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should clear error when error message exist', () => {
    const fieldName = 'email';
    const errors = {
      [fieldName]: {
        type: 'required',
        message: 'error message',
      } as FieldErrors<{ [key: string]: { type: string; message: string } }>,
    };
    clearErrorOnChange(fieldName, errors, mockClearError);

    expect(mockClearError).toHaveBeenCalledWith(fieldName);
  });

  it('should not call clearErrorFunc when error message does not exist', () => {
    const fieldName = 'name';
    const errors = {};
    clearErrorOnChange(fieldName, errors, mockClearError);

    expect(mockClearError).not.toHaveBeenCalled();
  });
});

describe('getAPIErrorMessage', () => {
  it('should return the error message from Axios response data', () => {
    const mockError = new AxiosError(
      'Request failed',
      undefined,
      undefined,
      undefined,
      {
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
        data: 'Invalid request data',
      },
    );

    const result = getAPIErrorMessage(mockError);
    expect(result).toBe('Invalid request data');
  });

  it('should return the default error message if response data is not a string', () => {
    const mockError = new AxiosError(
      'Request failed',
      undefined,
      undefined,
      undefined,
      {
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: {
          headers: {} as AxiosRequestHeaders,
        },
        data: { message: 'Server error' },
      },
    );

    const result = getAPIErrorMessage(mockError);
    expect(result).toBe(ERROR_MESSAGES.DEFAULT_API_ERROR);
  });

  it('should return the default error message if error is not an AxiosError', () => {
    const mockError = new Error('Something went wrong');

    const result = getAPIErrorMessage(mockError);
    expect(result).toBe(ERROR_MESSAGES.DEFAULT_API_ERROR);
  });

  it('should return the default error message if error is null or undefined', () => {
    expect(getAPIErrorMessage(null)).toBe(ERROR_MESSAGES.DEFAULT_API_ERROR);
    expect(getAPIErrorMessage(undefined)).toBe(
      ERROR_MESSAGES.DEFAULT_API_ERROR,
    );
  });
});
