import { fireEvent, render, screen, waitFor } from 'test-utils';

// Components
import { LoginForm } from '../index';

// Constants
import { FORM_VALIDATION_MESSAGE } from '@/constants';

describe('LoginForm', () => {
  const mockProps = {
    onsubmit: jest.fn(),
  };

  it('should render properly', () => {
    const { toJSON } = render(<LoginForm {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call onSubmit when login button is pressed', async () => {
    render(<LoginForm {...mockProps} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'olivier+2@gmail.com');
    fireEvent.changeText(passwordInput, 'Admin@123');

    fireEvent.press(screen.getByText('Login'));

    await waitFor(() => {
      expect(mockProps.onsubmit).toHaveBeenCalled();
    });
  });

  it('validates email field', async () => {
    render(<LoginForm {...mockProps} />);
    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent(emailInput, 'blur');

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.INVALID('Email')),
      ).toBeTruthy();
    });
  });

  it('validates password field', async () => {
    render(<LoginForm {...mockProps} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.changeText(passwordInput, 'short');
    fireEvent(passwordInput, 'blur');

    await waitFor(() => {
      expect(
        screen.getByText(FORM_VALIDATION_MESSAGE.MIN_LENGTH('Password', 8)),
      ).toBeTruthy();
    });
  });
});
