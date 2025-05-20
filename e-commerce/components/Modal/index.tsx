import { memo, ReactNode } from 'react';
import {
  Modal as RNModal,
  ModalProps as RNModalProps,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';

// Themes
import { colors } from '@/themes';

interface ModalProps extends RNModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  transparent?: boolean;
  extraStyle?: StyleProp<ViewStyle>;
}

const ModalComponent = ({
  visible,
  onClose,
  children,
  transparent = true,
  animationType = 'fade',
  extraStyle,
  ...rest
}: ModalProps) => {
  return (
    <RNModal
      visible={visible}
      animationType={animationType}
      transparent={transparent}
      onRequestClose={onClose}
      statusBarTranslucent={true}
      {...rest}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={[styles.overlay, extraStyle]}>
          <View style={styles.content}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

export const Modal = memo(ModalComponent);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    backgroundColor: colors.light,
    borderRadius: 12,
    padding: 20,
    width: '100%',
    // Optional: shadow for iOS & elevation for Android
    ...Platform.select({
      ios: {
        shadowColor: colors.dark,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 2 },
      },
      android: {
        elevation: 6,
      },
    }),
  },
});
