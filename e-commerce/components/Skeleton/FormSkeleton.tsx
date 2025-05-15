import { View, StyleSheet, ScrollView } from 'react-native';

// Components
import { Text } from '../Text';
import { Skeleton } from './Skeleton';

// Themes
import { colors, fontsFamily, fontSizes } from '@/themes';

export const FormSkeleton = () => (
  <ScrollView style={styles.container}>
    <View style={styles.avatarWrapper}>
      <Skeleton height={96} width={96} borderRadius={60} />
    </View>

    <Text size="lg" style={styles.title}>
      Personal Details
    </Text>
    <View style={styles.profileWrapper}>
      <View>
        <Text style={styles.label}>Email Address</Text>
        <Skeleton height={52} width="100%" borderRadius={6} />
      </View>
      <View>
        <Text style={styles.label}>Username</Text>
        <Skeleton height={52} width="100%" borderRadius={6} />
      </View>
    </View>

    <Text style={styles.title} size="lg">
      Business Address Details
    </Text>
    <View style={styles.profileWrapper}>
      <View>
        <Text style={styles.label}>Address</Text>
        <Skeleton height={52} width="100%" borderRadius={6} />
      </View>
      <View>
        <Text style={styles.label}>City</Text>
        <Skeleton height={52} width="100%" borderRadius={6} />
      </View>
      <View>
        <Text style={styles.label}>State</Text>
        <Skeleton height={52} width="100%" borderRadius={6} />
      </View>
      <View>
        <Text style={styles.label}>Country</Text>
        <Skeleton height={52} width="100%" borderRadius={6} />
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 8,
  },

  label: {
    fontSize: fontSizes.xs,
    fontFamily: fontsFamily.primary,
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

  saveButton: {
    height: 52,
    borderRadius: 8,
  },

  avatarWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
});
