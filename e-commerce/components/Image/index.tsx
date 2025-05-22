import { memo } from 'react';
import { Image as ExpoImage, ImageProps } from 'expo-image';

// Constants
import { BLUR_IMAGE } from '@/constants';

interface Props extends Partial<ImageProps> {
  alt?: string;
}

const ImageComponent = ({ source, style, ...props }: Props) => (
  <ExpoImage
    source={source}
    placeholder={{ blurhash: BLUR_IMAGE }}
    style={style}
    {...props}
  />
);

export const Image = memo(ImageComponent);
