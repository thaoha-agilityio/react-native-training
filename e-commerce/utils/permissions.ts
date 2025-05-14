import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';
import * as Linking from 'expo-linking';
import { Alert } from 'react-native';

/**
 * Requests camera permission from the user.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if the permission is granted, otherwise false.
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  const CAMERA_DENIAL_COUNT_KEY = 'CAMERA_DENIAL_COUNT';
  const { status: currentStatus } = await getCameraPermissionsAsync();
  if (currentStatus === 'granted') {
    await AsyncStorage.removeItem(CAMERA_DENIAL_COUNT_KEY);
    return true;
  }

  const storedCount = await AsyncStorage.getItem(CAMERA_DENIAL_COUNT_KEY);
  const denialCount = storedCount ? parseInt(storedCount, 10) : 0;

  const { status: requestStatus, canAskAgain } =
    await requestCameraPermissionsAsync();

  if (requestStatus === 'granted') {
    await AsyncStorage.removeItem(CAMERA_DENIAL_COUNT_KEY);
    return true;
  }

  const newDenialCount = denialCount + 1;
  await AsyncStorage.setItem(CAMERA_DENIAL_COUNT_KEY, String(newDenialCount));

  if (!canAskAgain && newDenialCount >= 3) {
    showPermissionDeniedAlert('Camera access is required.');
  }

  return false;
};

/**
 * Requests photo library permission from the user.
 *
 * For iOS, it requests the PHOTO_LIBRARY permission
 * For Android, it requests the READ_MEDIA_IMAGES permission
 *
 * @returns {Promise<boolean>} A promise that resolves to true if the permission is granted, otherwise false.
 */
export const requestPhotoLibraryPermission = async (): Promise<boolean> => {
  const { status } = await getMediaLibraryPermissionsAsync();

  if (status === 'granted') {
    return true;
  }

  const { status: requestStatus } = await requestMediaLibraryPermissionsAsync();

  if (requestStatus === 'granted') {
    return true;
  }

  showPermissionDeniedAlert('Media library access is required.');
  return false;
};

/**
 * Displays an alert to the user with the given message and options.
 *
 * @param {string} message - The message to display in the alert.
 * @returns {void}
 */
export const showPermissionDeniedAlert = (message: string): void => {
  const handleOpenSettings = () => {
    Linking.openSettings();
  };

  Alert.alert('Permission Denied', message, [
    { text: 'Cancel', style: 'cancel' },
    {
      text: 'Open Settings',
      onPress: handleOpenSettings,
    },
  ]);
};
