import {render, fireEvent, screen} from 'test-utils';

// Components
import {CartList} from '..';

// Mocks
import {MOCK_CART} from '@/mocks';

// Interfaces
import {Cart} from '@/interfaces';

const mockOnRemove = jest.fn();
const mockOnChangeQuantity = jest.fn();

describe('CartList', () => {
  const mockProps = {
    carts: MOCK_CART,
    onRemove: mockOnRemove,
    onChangeQuantity: mockOnChangeQuantity,
  };

  it('should render properly', () => {
    const {toJSON} = render(<CartList {...mockProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should call onRemove when remove button is pressed.', () => {
    render(<CartList {...mockProps} />);

    fireEvent.press(screen.getAllByTestId('remove-icon')[0]);

    expect(mockOnRemove).toHaveBeenCalled();
  });

  it('should call mockOnChangeQuantity when "+" button is pressed.', () => {
    render(<CartList {...mockProps} />);

    fireEvent.press(screen.getAllByTestId('quantity-increase')[0]);

    expect(mockOnChangeQuantity).toHaveBeenCalledWith(MOCK_CART[0].id, 4);
  });

  it('should render correctly with data has item null', () => {
    render(<CartList {...mockProps} carts={[] as Cart[]} />);

    expect(screen.getByText('No items in your cart')).toBeTruthy();
  });
});
