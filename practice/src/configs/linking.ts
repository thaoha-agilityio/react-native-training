import {LinkingOptions} from '@react-navigation/native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';
import {Linking} from 'react-native';
import notifee, {EventType} from '@notifee/react-native';
import {checkNotifications} from 'react-native-permissions';

// Constants
import {config, APP_SCHEME} from '@/constants';

// Stores
import {useAuthStore} from '@/stores';

// Utils
import {generateDeepLink, showPermissionDeniedAlert} from '@/utils';

const getInitialURL = async (): Promise<string | null> => {
  // Handle deep link when app is opened from a killed state
  const message = await messaging().getInitialNotification();

  const deepLink = message?.data?.deepLink;
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  if (deepLink && typeof deepLink === 'string') {
    return generateDeepLink(isAuthenticated, deepLink);
  }

  const url = await Linking.getInitialURL();
  return typeof url === 'string' ? url : null;
};

const onMessageReceived = async (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  const {notification, data} = remoteMessage;
  if (!notification) return;
  const {status: checkStatus} = await checkNotifications();

  if (checkStatus !== 'granted') {
    showPermissionDeniedAlert('Notification access is required.');
  }

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
};

const subscribe = (listener: (url: string) => void) => {
  const isAuthenticated = useAuthStore.getState().isAuthenticated;

  // Avoid multiple event listeners being attached
  const unsubscribeOnMessage = messaging().onMessage(onMessageReceived);

  // Listen for deep links when app is in foreground/background
  const unsubscribeLinking = Linking.addEventListener('url', event => {
    listener(generateDeepLink(isAuthenticated, event.url));
  });

  // Handle notification tap while app is in background
  const unsubscribeMessaging = messaging().onNotificationOpenedApp(
    remoteMessage => {
      const deepLink = remoteMessage?.data?.deepLink;
      if (deepLink && typeof deepLink === 'string') {
        listener(generateDeepLink(isAuthenticated, deepLink));
      }
    },
  );

  // Handle notification tap while app is in foreground
  const unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
    if (type !== EventType.PRESS) return;

    const deepLink = detail.notification?.data?.deepLink;
    if (deepLink && typeof deepLink === 'string') {
      listener(generateDeepLink(isAuthenticated, deepLink));
    }
  });

  return () => {
    unsubscribeLinking.remove();
    unsubscribeMessaging();
    unsubscribeNotifee();
    unsubscribeOnMessage();
  };
};

export const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [APP_SCHEME],
  config,
  getInitialURL,
  subscribe,
};
