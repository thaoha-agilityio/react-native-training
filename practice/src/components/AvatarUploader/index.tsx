import {lazy, memo, Suspense, useEffect, useState} from 'react';
import {FileSystem} from 'react-native-file-access';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// Components
import {CameraIcon} from '../icons';

// Utils
import {requestCameraPermission, requestPhotoLibraryPermission} from '@/utils';

const ImagePickerModal = lazy(() => import('./ImagePickerModal'));

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
  const [isRemoveCache, setIsRemoveCache] = useState(false);

  const handleSelectImage = (uri?: string) => {
    if (!uri) return;

    setAvatarSrc(uri);
    onChange(uri);
    setIsVisible(false);
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) return;

    launchCamera({mediaType: 'photo', quality: 0.8}, response => {
      if (response.assets) {
        handleSelectImage(response.assets[0].uri);
        setIsRemoveCache(true);
      }
    });
  };

  const handleChooseFromLibrary = async () => {
    const hasPermission = await requestPhotoLibraryPermission();

    if (!hasPermission) return;

    launchImageLibrary({mediaType: 'photo', quality: 0.8}, response => {
      if (response.assets && response.assets.length > 0) {
        handleSelectImage(response.assets[0].uri);
      }
    });
  };

  const handleOpenModal = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setAvatarSrc(avatarUpload || avatar);
  }, [avatar, avatarUpload]);

  const handleRemoveCache = async () => {
    if (!isRemoveCache) return;

    await FileSystem.unlink(currentAvatar || '');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={styles.avatarWrapper}>
          <Image
            source={
              currentAvatar
                ? {uri: currentAvatar}
                : require('@/assets/images/avatar-default.jpg')
            }
            onLoadEnd={handleRemoveCache}
            style={styles.avatar}
          />

          <View style={styles.icon}>
            <CameraIcon />
          </View>
        </View>
      </TouchableOpacity>
      {isVisible && (
        <Suspense fallback={<ActivityIndicator />}>
          <ImagePickerModal
            isVisible={isVisible}
            onChooseFromLibrary={handleChooseFromLibrary}
            onTakePhoto={handleTakePhoto}
            onClose={handleCloseModal}
          />
        </Suspense>
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
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  icon: {
    position: 'absolute',
    bottom: 15,
    right: 0,
  },
});
