import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'e-commerce',
  slug: 'e-commerce',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'e-commerce-app',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.thaoha.ecommerce',
  },
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/images/favicon.png',
  },
  plugins: [
    'expo-router',
    'expo-font',
    [
      'expo-splash-screen',
      {
        backgroundColor: '#fff',
        image: './assets/images/splash.png',
        imageWidth: 200,
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    eas: {
      projectId: '229cc5b2-2cf7-4992-be9d-9b5f606c3346',
    },
  },
});
