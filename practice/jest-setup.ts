import '@testing-library/jest-native/extend-expect';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(() => Promise.resolve(null)),
    removeItem: jest.fn(),
  };
});

jest.mock('react-native-fast-image', () => 'FastImage');

jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    onMessage: jest.fn(), // Mock the onMessage listener
    onNotificationOpenedApp: jest.fn(), // Mock for notification opened
    getInitialNotification: jest.fn(), // Mock for initial notification
    requestPermission: jest.fn().mockResolvedValue(true), // Mock permission request
    hasPermission: jest.fn().mockResolvedValue(true), // Mock permission check
    getToken: jest.fn().mockResolvedValue('mocked-firebase-token'), // Mock token retrieval
    deleteToken: jest.fn().mockResolvedValue(null), // Mock token deletion
  });
});

jest.mock('@notifee/react-native', () =>
  require('@notifee/react-native/jest-mock'),
);

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValue(false),
    isVisible: jest.fn().mockResolvedValue(false),
    useHideAnimation: jest.fn().mockReturnValue({
      container: {},
      logo: {source: 0},
      brand: {source: 0},
    }),
  };
});

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('react-native-keychain', () => ({
  SECURITY_LEVEL_ANY: 'MOCK_SECURITY_LEVEL_ANY',
  SECURITY_LEVEL_SECURE_SOFTWARE: 'MOCK_SECURITY_LEVEL_SECURE_SOFTWARE',
  SECURITY_LEVEL_SECURE_HARDWARE: 'MOCK_SECURITY_LEVEL_SECURE_HARDWARE',
  setGenericPassword: jest.fn().mockResolvedValue(true),
  getGenericPassword: jest.fn().mockResolvedValue(true),
  resetGenericPassword: jest.fn().mockResolvedValue(true),
  getInternetCredentials: jest.fn().mockResolvedValue(true),
  getSupportedBiometryType: jest.fn().mockResolvedValue(true),
  setInternetCredentials: jest.fn().mockResolvedValue(true),
}));
