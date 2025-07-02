import { Image } from '@/components/Image'; // adjust the path as needed

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
    console.log('image.props.placeholder', image.props.placeholder);
    expect(image.props.placeholder).toEqual([
      {
        uri: 'blurhash:/%7CrF%3FhV%252WCj%5Bayj%5Ba%7Cj%5Baz_NaeWBj@ayfRayfQfQM%7BM%7Cazj%5Bazf6fQfQfQIpWXofj%5Bayj%5Bj%5BfQayWCoeoeaya%7Dj%5BayfQa%7BoLj%3Fj%5BWVj%5Bayayj%5BfQoff7azayj%5Bayj%5Bj%5Bayofayayayj%5BfQj%5Bayayj%5Bayfjj%5Bj%5Bayjuayj%5B',
        width: 16,
        height: 16,
      },
    ]);
  });
});
