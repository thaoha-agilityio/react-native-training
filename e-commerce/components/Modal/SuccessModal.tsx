import { memo, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// Components
import { Modal } from '.';
import { Button } from '../Button';
import { SuccessIcon } from '../icons';

// Themes
import { fontWeights } from '@/themes';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

const SuccessModalComponent = ({
  visible,
  onClose,
  onNavigate,
  ...rest
}: SuccessModalProps) => {
  const scale = useSharedValue(1);
  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withSpring(1.3, { damping: 4 }, () => {
      scale.value = withSpring(1);
    });
  }, [scale]);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      extraStyle={styles.overlay}
      {...rest}
    >
      <Animated.View style={[animatedScaleStyle, { alignItems: 'center' }]}>
        <SuccessIcon />
      </Animated.View>
      <Text style={styles.text}>Payment done successfully.</Text>
      <Button title="Go to Home" style={styles.button} onPress={onNavigate} />
    </Modal>
  );
};

export const SuccessModal = memo(SuccessModalComponent);

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  text: {
    textAlign: 'center',
    fontWeight: fontWeights.semiBold,
    fontSize: 14,
  },

  button: {
    height: 50,
    marginTop: 20,
  },
});
