import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

// Themes
import {colors, fontSizes} from '@/themes';

interface ImagePickerModalProps {
  isVisible: boolean;
  onClose: () => void;
  onTakePhoto: () => void;
  onChooseFromLibrary: () => void;
}

const ImagePickerModal = ({
  isVisible,
  onClose,
  onTakePhoto,
  onChooseFromLibrary,
}: ImagePickerModalProps) => (
  <Modal
    visible={isVisible}
    transparent
    animationType="slide"
    onRequestClose={onClose}>
    <TouchableWithoutFeedback onPress={onClose}>
      {/* Backdrop Overlay */}
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
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
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
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

export default ImagePickerModal;
