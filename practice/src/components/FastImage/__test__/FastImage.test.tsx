import {render} from '@testing-library/react-native';
import {FastImage} from '..';

describe('FastImage Component', () => {
  const mockUri = 'https://example.com/image.jpg';

  it('renders placeholder while loading', () => {
    const {toJSON} = render(<FastImage uri={mockUri} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
