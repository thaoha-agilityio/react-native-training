import { fireEvent, render, screen } from 'test-utils';

// Component
import { PasswordInput } from '../index';

describe('PasswordInput component', () => {
  const placeholderText = 'Enter your password';
  it('should render properly', () => {
    const { toJSON } = render(<PasswordInput />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('passes correct props to Input component', () => {
    render(<PasswordInput placeholder={placeholderText} />);

    const input = screen.getByPlaceholderText(placeholderText);
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('calls onChangeText when typing in the input', () => {
    const onChangeTextMock = jest.fn();
    render(
      <PasswordInput
        onChangeText={onChangeTextMock}
        placeholder={placeholderText}
      />,
    );

    const input = screen.getByPlaceholderText('Enter your password');
    fireEvent.changeText(input, 'new password');

    expect(onChangeTextMock).toHaveBeenCalledWith('new password');
  });

  it('should toggle password visibility on icon press', () => {
    render(<PasswordInput placeholder={placeholderText} />);

    const toggleButton = screen.getByTestId('toggle-password');
    const input = screen.getByPlaceholderText('Enter your password');

    // Initially, secureTextEntry should be true (password hidden)
    expect(input.props.secureTextEntry).toBe(true);

    // Toggle password visibility
    fireEvent.press(toggleButton);

    // Now, secureTextEntry should be false (password visible)
    expect(input.props.secureTextEntry).toBe(false);

    // Toggle password visibility
    fireEvent.press(toggleButton);
    expect(input.props.secureTextEntry).toBe(true);
  });
});
