import {render, fireEvent, screen} from 'test-utils';

// Components
import {CardItem} from '../index';

const mockProps = {
  id: '1',
  name: 'Black Simple Lamp',
  price: 12,
  image:
    'https://www.interior-essentials.com/wp-content/uploads/2021/07/InteriorEssentialsRoleOfFurnitureInteriorDesign.jpg',
  onAddToCart: jest.fn(),
  onShowProductDetails: jest.fn(),
};

describe('CardItem component', () => {
  it('should render properly', () => {
    const {toJSON} = render(<CardItem {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onAddToCart when the AddCartIcon is pressed', () => {
    render(<CardItem {...mockProps} />);

    fireEvent.press(screen.getByTestId('add-to-cart'));
    expect(mockProps.onAddToCart).toHaveBeenCalledTimes(1);
  });

  it('formats price correctly', () => {
    const propsWithDecimal = {
      ...mockProps,
      price: 12,
    };

    render(<CardItem {...propsWithDecimal} />);
    expect(screen.getByText('$ 12.00')).toBeTruthy();
  });
});
