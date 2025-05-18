import { memo } from 'react';
import { StyleSheet, View } from 'react-native';

// Components
import { Modal } from '.';
import { Button } from '../Button';
import { SuccessIcon } from '../icons';
import { Text } from '../Text';

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
}: SuccessModalProps) => (
  <Modal
    visible={visible}
    onClose={onClose}
    extraStyle={styles.overlay}
    {...rest}
  >
    <View style={{ alignItems: 'center' }}>
      <SuccessIcon />
    </View>
    <Text style={styles.text} size="sm">
      Payment done successfully.
    </Text>
    <Button title="Go to Home" style={styles.button} onPress={onNavigate} />
  </Modal>
);

export const SuccessModal = memo(SuccessModalComponent);

const styles = StyleSheet.create({
  overlay: {
    justifyContent: 'center',
    paddingHorizontal: 22,
  },

  text: {
    textAlign: 'center',
    fontWeight: fontWeights.semiBold,
  },

  button: {
    height: 50,
    marginTop: 20,
  },
});
