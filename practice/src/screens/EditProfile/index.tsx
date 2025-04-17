import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useCallback} from 'react';

// Components
import {ProfileForm} from '@/components';

// Stores
import {useAuthStore} from '@/stores';

// Hooks
import {useEditUser, useGetUser} from '@/hooks';

// Utils
import {getAPIErrorMessage} from '@/utils';

// Constants
import {SCREENS} from '@/constants';

// Types
import {AppStackScreenProps, UserPayload} from '@/interfaces';

type EditProfileScreenProps = AppStackScreenProps<typeof SCREENS.EDIT_PROFILE>;
export const EditProfileScreen = ({navigation}: EditProfileScreenProps) => {
  const userId = useAuthStore(state => state.userId);
  const {user: userDetails} = useGetUser(userId);
  const {
    username = '',
    email = '',
    avatar = '',
    phoneNumber = '',
    dateOfBirth = '',
  } = userDetails || {};

  const {mutate: editUser, isPending} = useEditUser(userId);

  const handleEditSuccess = useCallback(() => {
    Toast.show({type: 'success', text1: 'Profile updated successfully'});
    navigation.goBack();
  }, [navigation]);

  const handleEditError = useCallback((error: string) => {
    Toast.show({type: 'error', text1: getAPIErrorMessage(error)});
  }, []);

  const handleEditProfile = (payload: UserPayload) => {
    editUser(payload, {
      onSuccess: handleEditSuccess,
      onError: error => {
        handleEditError(error);
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ProfileForm
          email={email}
          username={username}
          phoneNumber={phoneNumber}
          dateOfBirth={dateOfBirth}
          avatar={avatar}
          isLoading={isPending}
          onEdit={handleEditProfile}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
});
