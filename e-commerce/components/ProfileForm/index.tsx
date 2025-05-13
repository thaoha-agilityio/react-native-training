import { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { AvatarUploader } from '../AvatarUpload';
import { Text } from '../Text';
import { colors, fontsFamily } from '@/themes';
import { Input } from '../Input';
import { Dropdown } from '../Dropdown';

const ProfileFormComponent = () => {
  return (
    <ScrollView style={styles.container}>
      <AvatarUploader />
      <Text size="lg" style={styles.title}>
        Personal Details
      </Text>
      <View style={styles.profileWrapper}>
        <Input label="Email Address" />
        <Input label="Username" />
      </View>
      <Text style={styles.title} size="lg">
        Business Address Details
      </Text>
      <View style={styles.profileWrapper}>
        <Input label="Address" />
        <Input label="City" />
        <Dropdown />
        <Input label="Zip Code" />
      </View>
    </ScrollView>
  );
};

export const ProfileForm = memo(ProfileFormComponent);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },

  title: {
    fontFamily: fontsFamily.semiBold,
    marginTop: 20,
  },

  profileWrapper: {
    marginTop: 20,
    gap: 28,
    paddingBottom: 36,
    borderBottomWidth: 0.5,
    borderColor: colors.border,
  },
});
