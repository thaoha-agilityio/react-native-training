import {FieldErrors} from 'react-hook-form';

import {clearErrorOnChange} from '../common';

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
      } as FieldErrors<{[key: string]: {type: string; message: string}}>,
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
