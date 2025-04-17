import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  check,
  checkNotifications,
  requestNotifications,
  openSettings,
} from 'react-native-permissions';

/**
 * Requests camera permission from the user.
 *
 * For iOS, it requests the CAMERA permission using `react-native-permissions`.
 * For Android, it requests the CAMERA permission using `PermissionsAndroid`.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if the permission is granted, otherwise false.
 */

export const requestCameraPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const permission = PERMISSIONS.IOS.CAMERA;
    const currentStatus = await check(permission);

    if (currentStatus === RESULTS.GRANTED) {
      return true;
    }

    const result = await request(permission);
    if (result === RESULTS.GRANTED) {
      return true;
    }

    showPermissionDeniedAlert('Camera access is required.');
    return false;
  }

  if (Platform.OS === 'android') {
    const permission = PermissionsAndroid.PERMISSIONS.CAMERA;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const result = await PermissionsAndroid.request(permission);
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    showPermissionDeniedAlert('Camera access is required.');
    return false;
  }

  // Fallback for unsupported platforms (e.g., web)
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
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY
      : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

  const result = await check(permission);
  if (result === RESULTS.GRANTED) {
    return true;
  }

  if (result === RESULTS.DENIED) {
    showPermissionDeniedAlert('Photo library access is required.');
    return false;
  }

  const requestResult = await request(permission);
  return requestResult === RESULTS.GRANTED;
};

/**
 * Displays an alert to the user with the given message and options.
 *
 * @param {string} message - The message to display in the alert.
 * @returns {void}
 */
export const showPermissionDeniedAlert = (message: string): void => {
  const handleOpenSettings = () => {
    openSettings();
  };

  Alert.alert('Permission Denied', message, [
    {text: 'Cancel', style: 'cancel'},
    {
      text: 'Open Settings',
      onPress: handleOpenSettings,
    },
  ]);
};

export const handleNotificationPermission = async () => {
  // First check existing permission
  const {status: checkStatus} = await checkNotifications();

  if (checkStatus === 'granted') {
    return;
  }

  // Request permission if not already granted
  await requestNotifications(['alert', 'sound', 'badge']);
};
