import {render, screen, fireEvent} from 'test-utils';

// Components
import {Products} from '..';

// Mocks
import {MOCK_PRODUCTS} from '@/mocks';

const mockOnNavigateProductDetail = jest.fn();
const mockOnAddToCart = jest.fn();

describe('Products component', () => {
  const mockProps = {
    data: MOCK_PRODUCTS,
    onShowProductDetails: mockOnNavigateProductDetail,
    onAddToCart: mockOnAddToCart,
  };

  it('should render properly', () => {
    const {toJSON} = render(<Products {...mockProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should calls onNavigateProductDetail when a product is pressed', () => {
    render(<Products {...mockProps} isLoading={true} />);

    fireEvent.press(screen.getByText(MOCK_PRODUCTS[0].name));

    expect(mockOnNavigateProductDetail).toHaveBeenCalledWith(
      MOCK_PRODUCTS[0].id,
    );
  });

  it('should calls onAddToCart when the add cart is pressed', () => {
    render(<Products {...mockProps} />);

    fireEvent.press(screen.getAllByTestId('add-to-cart')[0]);

    expect(mockOnAddToCart).toHaveBeenCalled();
  });

  it('should display loading indicator when isFetchingNextPage is true', () => {
    render(<Products {...mockProps} isFetchingNextPage />);

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows empty list message when there are no products', () => {
    render(<Products {...mockProps} data={[]} />);

    expect(screen.getByText('No records to display')).toBeTruthy();
  });
});
