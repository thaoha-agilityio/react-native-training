import { Image } from '@/components/Image'; // adjust the path as needed
import { BLUR_IMAGE } from '@/constants';

// Constants
import { render } from '@/test-utils';

describe('ImageComponent', () => {
  it('renders with source prop', () => {
    const { toJSON } = render(
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        testID="custom-image"
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('uses default fallback image when not provided', () => {
    const { getByTestId } = render(
      <Image
        source={{ uri: 'https://example.com/image.jpg' }}
        testID="custom-image"
      />,
    );

    const image = getByTestId('custom-image');
    expect(image.props.placeholder).toEqual([{ fallbackImage: BLUR_IMAGE }]);
  });
});
