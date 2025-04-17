import {fireEvent, render, screen} from 'test-utils';

// Components
import {CartItem} from '../index';

// Mocks
import {MOCK_CART} from '@/mocks';

const mockProps = {
  id: '1',
  img: 'https://cdn.media.amplience.net/i/shadesoflight/furniture_1?fmt=auto&w=575',
  name: 'Black Simple Lamp',
  price: 12,
  quantity: 1,
  onRemove: jest.fn(),
  onChangeQuantity: jest.fn(),
};

describe('CartItem', () => {
  it('should render properly', () => {
    const {toJSON} = render(<CartItem {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call onRemove when Close Icon is pressed.', () => {
    render(<CartItem {...mockProps} />);

    fireEvent.press(screen.getByTestId('remove-icon'));

    expect(mockProps.onRemove).toHaveBeenCalledWith('1');
  });

  it('should call mockOnChangeQuantity when "+" button is pressed.', () => {
    render(<CartItem {...mockProps} />);

    fireEvent.press(screen.getByTestId('quantity-increase'));

    expect(mockProps.onChangeQuantity).toHaveBeenCalledWith(MOCK_CART[0].id, 2);
  });
});
