import { memo, useCallback, useEffect, useState } from 'react';
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
import { AVATAR_DEFAULT } from '@/constants';

interface AvatarUploaderProps {
  avatar?: string;
  avatarUpload?: string;
  onChange: (value: string) => void;
}

const AvatarUploaderComponent = ({
  avatar,
  avatarUpload,
  onChange,
}: AvatarUploaderProps) => {
  const [currentAvatar, setAvatarSrc] = useState(avatarUpload || avatar);
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectImage = useCallback(
    (uri?: string) => {
      if (!uri) return;

      setAvatarSrc(uri);
      onChange(uri);
      setIsVisible(false);
    },
    [onChange],
  );

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleChooseFromLibrary = useCallback(async () => {
    const hasPermission = await requestPhotoLibraryPermission();

    if (!hasPermission) return;

    let result = await launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      handleSelectImage(result.assets[0].uri);
      setIsVisible(false);
    }
  }, [handleSelectImage]);

  const handleTakePhoto = useCallback(async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    let result = await launchCameraAsync({
      mediaTypes: ['images'],
      quality: 1,
    });

    if (!result.canceled) {
      handleSelectImage(result.assets[0].uri);
      setIsVisible(false);
    }
  }, [handleSelectImage]);

  useEffect(() => {
    setAvatarSrc(avatarUpload || avatar);
  }, [avatar, avatarUpload]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={styles.avatarWrapper}>
          <Image
            source={
              currentAvatar ? { uri: currentAvatar } : AVATAR_DEFAULT.source
            }
            alt={AVATAR_DEFAULT.alt}
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
