import { memo, useEffect, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

// Components
import { EditIcon } from '../icons';

// Components
import { Image } from '../Image';

// Themes
import { colors } from '@/themes';

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

  useEffect(() => {
    setAvatarSrc(avatarUpload || avatar);
  }, [avatar, avatarUpload]);

  return (
    <View style={styles.container}>
      <TouchableOpacity>
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
