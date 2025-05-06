import { memo } from 'react';
import { Image as ExpoImage, ImageProps } from 'expo-image';

// Constants
import { BLUR_IMAGE } from '@/constants';

interface Props extends Partial<ImageProps> {
  fallbackImage?: string;
  alt?: string;
}

const ImageComponent = ({
  source,
  fallbackImage = BLUR_IMAGE,
  style,
  ...props
}: Props) => {
  return (
    <ExpoImage
      source={source}
      placeholder={{ fallbackImage }}
      style={style}
      {...props}
    />
  );
};

export const Image = memo(ImageComponent);
