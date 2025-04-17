import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {useEffect} from 'react';
import {Linking} from 'react-native';

const onMessageReceived = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  const {notification, data} = remoteMessage;

  // Display the notification when in foreground
  await notifee.displayNotification({
    title: notification?.title,
    body: notification?.body,
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher',
    },
    data,
  });

  // Listen for taps on the notification in foreground
  notifee.onForegroundEvent(({type, detail}) => {
    if (type === EventType.PRESS && detail.notification?.data?.deepLink) {
      Linking.openURL(detail.notification.data.deepLink as string);
    }
  });
};

export const useSubscribeDeviceToken = () => {
  useEffect(() => {
    // Listen for notifications while the app is in foreground
    const unsubscribeOnMessage = messaging().onMessage(onMessageReceived);

    // Listen for notification taps when the app is in the background
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(remoteMessage => {
        const deepLink = remoteMessage?.data?.deepLink;

        if (deepLink) {
          Linking.openURL(deepLink as string);
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);
};
