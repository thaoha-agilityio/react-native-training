import { render, screen } from 'test-utils';

// Components
import { ProductList } from '..';

// Mocks
import { MOCK_PRODUCTS } from '@/mocks';

const mockOnNavigateProductDetail = jest.fn();

describe('Products component', () => {
  const mockProps = {
    data: MOCK_PRODUCTS,
    onShowProductDetails: mockOnNavigateProductDetail,
  };

  it('should render properly', () => {
    const { toJSON } = render(<ProductList {...mockProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should display loading indicator when isFetchingNextPage is true', () => {
    render(<ProductList {...mockProps} isFetchingNextPage />);

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });
});
