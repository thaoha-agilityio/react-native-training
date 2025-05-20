import { memo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Modal } from '../Modal';
import { Text } from '../Text';

// Themes
import { colors, fontSizes } from '@/themes';

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromLibrary: () => void;
}

const ImagePickerModalComponent = ({
  visible,
  onClose,
  onTakePhoto,
  onChooseFromLibrary,
  ...rest
}: ImagePickerModalProps) => (
  <Modal
    visible={visible}
    onClose={onClose}
    {...rest}
    style={{ width: '100%' }}
  >
    <TouchableOpacity style={styles.option} onPress={onTakePhoto}>
      <Text style={styles.optionText}>Take Photo</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.option} onPress={onChooseFromLibrary}>
      <Text style={styles.optionText}> Choose from Library</Text>
    </TouchableOpacity>

    {/* Cancel Button */}
    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
      <Text style={styles.cancelText}> Cancel</Text>
    </TouchableOpacity>
  </Modal>
);

export const ImagePickerModal = memo(ImagePickerModalComponent);

const styles = StyleSheet.create({
  option: {
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionText: {
    fontSize: fontSizes.lg,
    color: colors.text.primary,
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: fontSizes.lg,
    color: 'red',
  },
});
