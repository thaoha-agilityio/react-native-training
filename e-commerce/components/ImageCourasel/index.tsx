import {
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { memo } from 'react';

// Components
import { Image } from '../Image';

interface ImageCarouselProps {
  onOpenModal: (image: string) => void;
  image: string;
  viewStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

const ImageCarouselComponent = ({
  onOpenModal,
  image,
  viewStyle,
  imageStyle,
}: ImageCarouselProps) => {
  const handleOpenModal = () => onOpenModal(image);

  return (
    <TouchableOpacity onPress={handleOpenModal} style={viewStyle}>
      <Image source={image} contentFit="cover" style={imageStyle} />
    </TouchableOpacity>
  );
};

export const ImageCarousel = memo(ImageCarouselComponent);
