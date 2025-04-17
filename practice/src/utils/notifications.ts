import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

export const handleGetDeviceToken = async () => {
  try {
    const token = await messaging().getToken();

    return token;
  } catch (error) {
    console.log('Error getting FCM Token', error);
  }
};

export const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });
};
