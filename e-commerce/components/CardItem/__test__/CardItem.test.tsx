import { render, fireEvent, screen } from 'test-utils';

// Components
import { CardItem } from '..';

const mockProps = {
  id: '1',
  name: 'Mens Starry',
  price: 12,
  image:
    'https://www.interior-essentials.com/wp-content/uploads/2021/07/InteriorEssentialsRoleOfFurnitureInteriorDesign.jpg',
  height: 136,
  rating: 4,
  reviewNumber: 1230,
  description:
    ' Autumn And Winter Casual cotton-padded jacket And Winter Casual cotton-padded jacket',
  onPress: jest.fn(),
};

describe('CardItem component', () => {
  it('should render properly', () => {
    const { toJSON } = render(<CardItem {...mockProps} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('formats price correctly', () => {
    const propsWithDecimal = {
      ...mockProps,
      price: 12,
    };

    render(<CardItem {...propsWithDecimal} />);
    expect(screen.getByText('$ 12.00')).toBeTruthy();
  });

  it('should be onPress prop is called', () => {
    render(<CardItem {...mockProps} />);

    fireEvent.press(screen.getByText('Mens Starry'));
    expect(mockProps.onPress).toHaveBeenCalledTimes(1);
  });
});
