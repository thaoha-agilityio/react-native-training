import { useCallback } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

// Components
import { ProfileForm } from '@/components';
import { ArrowLeftIcon } from '@/components/icons';

// Stores
import { useAuthStore } from '@/stores';

// Hooks
import { useEditUser, useGetUser } from '@/hooks';

// Utils
import { getAPIErrorMessage } from '@/utils';

// Types
import { UserPayload } from '@/interfaces';

const EditProfileScreen = () => {
  const userId = useAuthStore((state) => state.userId);
  const { user: userDetails } = useGetUser(userId);
  const { mutate: editUser, isPending } = useEditUser(userId);

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
  } = userDetails || {};

  console.log('userDetails', userDetails);

  const handleGoBack = () => {
    router.back();
  };
  const handleEditSuccess = useCallback(() => {
    console.log('Profile updated successfully');
    handleGoBack();
  }, []);

  const handleEditError = useCallback((error: string) => {
    console.log('getAPIErrorMessage', getAPIErrorMessage(error));
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
    <View style={styles.container}>
      <Pressable onPress={handleGoBack} style={styles.backBtn}>
        <ArrowLeftIcon />
      </Pressable>
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
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
  },

  backBtn: {
    paddingHorizontal: 24,
  },
});
