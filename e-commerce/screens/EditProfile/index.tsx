import { router } from 'expo-router';
import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Components
import { FormSkeleton, ProfileForm } from '@/components';

// Hooks
import { useEditUser, useGetUserLogged, useTheme } from '@/hooks';

// Utils
import { getAPIErrorMessage } from '@/utils';

// Types
import { UserPayload } from '@/interfaces';

export const EditProfileScreen = () => {
  const { colors } = useTheme();

  const { user: userDetails, isLoading } = useGetUserLogged();

  const {
    username = '',
    email = '',
    avatar = '',
    phoneNumber = '',
    city = '',
    address = '',
    zipCode = '',
    accountHolderName = '',
    bankAccountNumber = '',
    state = '',
    id = '',
  } = userDetails || {};
  const { mutate: editUser, isPending } = useEditUser(id);

  const handleGoBack = () => {
    router.back();
  };
  const handleEditSuccess = useCallback(() => {
    Toast.show({ type: 'success', text1: 'Profile updated successfully' });

    handleGoBack();
  }, []);

  const handleEditError = useCallback((error: string) => {
    Toast.show({ type: 'error', text1: getAPIErrorMessage(error) });
  }, []);

  const handleEditProfile = (payload: UserPayload) => {
    editUser(payload, {
      onSuccess: handleEditSuccess,
      onError: (error) => {
        handleEditError(error);
      },
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.content }]}>
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <ProfileForm
          username={username}
          email={email}
          avatar={avatar}
          phoneNumber={phoneNumber}
          address={address}
          city={city}
          zipCode={zipCode}
          accountHolderName={accountHolderName}
          bankAccountNumber={bankAccountNumber}
          state={state}
          isLoading={isPending}
          onEdit={handleEditProfile}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
  },

  backBtn: {
    paddingHorizontal: 24,
  },
});
