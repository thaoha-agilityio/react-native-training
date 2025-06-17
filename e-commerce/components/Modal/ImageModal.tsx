import { memo } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Modal } from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Components
import { CloseIcon } from '../icons';

// Hooks
import { useTheme } from '@/hooks';

interface ImageModalProps {
  visible: boolean;
  image: string;
  onCloseImageModal: () => void;
}

const { width, height } = Dimensions.get('screen');
const ImageModalComponent = ({
  image,
  visible,
  onCloseImageModal,
}: ImageModalProps) => {
  const { colors: colorTheme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const tapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(250)
    .onStart(() => {
      const nextScale = scale.value > 1 ? 1 : 2.5;
      scale.value = withTiming(nextScale, { duration: 200 });
    });

  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    const nextScale = scale.value * event.scale;
    scale.value = withTiming(nextScale, { duration: 200 });
  });

  const gesture = Gesture.Simultaneous(tapGesture, pinchGesture);

  const handleCloseImageModal = () => {
    onCloseImageModal();

    // Reset transform for new image
    scale.value = 1;
  };
  return (
    <Modal visible={visible} transparent={true}>
      <GestureHandlerRootView
        style={[
          styles.modalContainer,
          { backgroundColor: colorTheme.background },
        ]}
      >
        <GestureDetector gesture={gesture}>
          <Animated.Image
            source={{ uri: image }}
            style={[styles.fullImage, animatedStyle]}
            resizeMode="contain"
          />
        </GestureDetector>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleCloseImageModal}
        >
          <CloseIcon color={colorTheme.default} />
        </TouchableOpacity>
      </GestureHandlerRootView>
    </Modal>
  );
};

export const ImageModal = memo(ImageModalComponent);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: width,
    height: height,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
});
