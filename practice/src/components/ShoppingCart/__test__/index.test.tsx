import {render, fireEvent, screen, renderHook, act} from 'test-utils';

// Components
import {ShoppingCart} from '..';

// Stores
import {useCartStore} from '@/stores';

// Mocks
import {MOCK_CART} from '@/mocks';

const mockOnNavigation = jest.fn();

describe('ShoppingCart', () => {
  const mockProps = {
    onNavigation: mockOnNavigation,
  };

  it('should render properly', () => {
    const {toJSON} = render(<ShoppingCart {...mockProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should call onNavigation when Cart Icon is pressed.', () => {
    render(<ShoppingCart {...mockProps} />);

    fireEvent.press(screen.getByTestId('cart-icon'));

    expect(mockOnNavigation).toHaveBeenCalled();
  });

  it('shows badge with correct count when cart has items', () => {
    const {result} = renderHook(() => useCartStore(), {
      withQueryClient: true,
    });
    act(() => {
      result.current.addItemToCart(MOCK_CART[0]);
    });

    render(<ShoppingCart onNavigation={mockOnNavigation} />);

    expect(screen.getByText('1')).toBeTruthy();
  });
});
