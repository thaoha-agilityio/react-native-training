import { router } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';

// Components
import { FormSkeleton, ProfileForm } from '@/components';
import { ArrowLeftIcon } from '@/components/icons';

// Stores
import { useAuthStore } from '@/stores';

// Hooks
import { useEditUser, useGetUser, useTheme } from '@/hooks';

// Utils
import { getAPIErrorMessage } from '@/utils';

// Types
import { UserPayload } from '@/interfaces';

export const EditProfile = () => {
  const { colors } = useTheme();
  const userId = useAuthStore((state) => state.userId);
  const { user: userDetails, isLoading } = useGetUser(userId);
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
      <Pressable onPress={handleGoBack} style={styles.backBtn}>
        <ArrowLeftIcon color={colors.default} />
      </Pressable>
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
