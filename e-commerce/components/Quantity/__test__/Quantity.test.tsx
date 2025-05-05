import { fireEvent, render, screen } from 'test-utils';
import { Quantity } from '../index';

const mockProps = {
  initialCount: 1,
  onQuantityChange: jest.fn(),
};

describe('Quantity component', () => {
  it('Quantity component displays the default count correctly', () => {
    const { toJSON } = render(<Quantity {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Quantity component calls onIncreaseProduct when the "+" button is clicked', () => {
    render(<Quantity {...mockProps} />);
    const increaseButton = screen.getByTestId('quantity-increase');

    fireEvent.press(increaseButton);

    expect(mockProps.onQuantityChange).toHaveBeenCalledTimes(1);
  });

  it('Quantity component calls onDecreaseProduct when the "-" button is clicked', () => {
    render(<Quantity {...mockProps} initialCount={2} />);
    const decreaseButton = screen.getByTestId('quantity-decrease');

    fireEvent.press(decreaseButton);

    expect(mockProps.onQuantityChange).toHaveBeenCalledTimes(2);
  });

  it('Does not decrement below 1', () => {
    const onQuantityChangeMock = jest.fn();
    render(
      <Quantity initialCount={1} onQuantityChange={onQuantityChangeMock} />,
    );

    const decreaseButton = screen.getByTestId('quantity-decrease');

    fireEvent.press(decreaseButton);

    expect(screen.getByText('1')).toBeTruthy();
    expect(onQuantityChangeMock).not.toHaveBeenCalled();
  });
});
