import { memo, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { launchImageLibraryAsync, launchCameraAsync } from 'expo-image-picker';

// Components
import { EditIcon } from '../icons';
import { Image } from '../Image';
import { ImagePickerModal } from './ImagePickerModal';

// Themes
import { colors } from '@/themes';

// Utils
import {
  requestCameraPermission,
  requestPhotoLibraryPermission,
} from '@/utils';

interface AvatarUploaderProps {
  avatar?: string;
  avatarUpload?: string;
  onChange?: (value: string) => void;
}

const AvatarUploaderComponent = ({
  avatar,
  avatarUpload,
  onChange,
}: AvatarUploaderProps) => {
  const [currentAvatar, setAvatarSrc] = useState(avatarUpload || avatar);
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const handleChooseFromLibrary = async () => {
    const hasPermission = await requestPhotoLibraryPermission();

    if (!hasPermission) return;

    let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarSrc(result.assets[0].uri);
      handleCloseModal();
    }
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    let result = await launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarSrc(result.assets[0].uri);
      handleCloseModal();
    }
  };

  useEffect(() => {
    setAvatarSrc(avatarUpload || avatar);
  }, [avatar, avatarUpload]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={styles.avatarWrapper}>
          <Image
            source={
              currentAvatar
                ? { uri: currentAvatar }
                : require('@/assets/images/avatar-default.jpg')
            }
            style={styles.avatar}
          />

          <View style={styles.icon}>
            <EditIcon />
          </View>
        </View>
      </TouchableOpacity>
      {isVisible && (
        <ImagePickerModal
          visible={isVisible}
          onClose={handleCloseModal}
          onTakePhoto={handleTakePhoto}
          onChooseFromLibrary={handleChooseFromLibrary}
        />
      )}
    </View>
  );
};

export const AvatarUploader = memo(AvatarUploaderComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 60,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderWidth: 3,
    borderRadius: 50,
    borderColor: colors.light,
    backgroundColor: colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
