// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-theme-switch-animation', () => {
  return {
    __esModule: true,
    default: jest.fn(), // if it exports a default function
  };
});

jest.mock('react-native-keyboard-controller', () =>
  require('react-native-keyboard-controller/jest'),
);
