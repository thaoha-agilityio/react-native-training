import { render, fireEvent, screen } from 'test-utils';

// Components
import { CartList } from '..';

// Mocks
import { MOCK_CART } from '@/mocks/cart';

// Interfaces
import { Cart } from '@/interfaces';

const mockOnRemove = jest.fn();
const mockOnChangeQuantity = jest.fn();

describe('CartList', () => {
  const mockProps = {
    data: MOCK_CART,
    onRemove: mockOnRemove,
    onChangeQuantity: mockOnChangeQuantity,
  };

  it.skip('should render properly', () => {
    const { toJSON } = render(<CartList {...mockProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should call mockOnChangeQuantity when "+" button is pressed.', () => {
    render(<CartList {...mockProps} />);

    fireEvent.press(screen.getAllByTestId('quantity-increase')[0]);

    expect(mockOnChangeQuantity).toHaveBeenCalledWith(MOCK_CART[0].id, 4);
  });

  it('should render correctly with data has item null', () => {
    render(<CartList {...mockProps} data={[] as Cart[]} />);

    expect(screen.getByText('No items in your cart')).toBeTruthy();
  });
});
