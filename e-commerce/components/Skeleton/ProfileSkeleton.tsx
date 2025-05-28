import { View, StyleSheet } from 'react-native';

// Components
import { Skeleton } from './Skeleton';
import { EditIcon } from '../icons';

// Hooks
import { useColorScheme } from '@/hooks';

// Themes
import { colorTheme } from '@/themes';

export const ProfileSkeleton = () => {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.infoWrapper}>
      <View style={styles.info}>
        <Skeleton height={80} width={80} borderRadius={50} />
        <View style={{ gap: 10 }}>
          <Skeleton height={30} width={80} />
          <Skeleton height={25} width={150} />
        </View>
      </View>

      <EditIcon color={colorTheme[colorScheme].default} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoWrapper: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
