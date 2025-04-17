import {useEffect, useState} from 'react';
import {DevSettings} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

// Components
import {Navigation} from './src/navigation';
import {SplashScreen} from '@/components';

// Utils
import {createNotificationChannel} from '@/utils';

// Hooks
import {useHydration} from '@/hooks';

const queryClient = new QueryClient({
  defaultOptions: {},
});

createNotificationChannel();

const App = () => {
  const [showStorybook, setShowStorybook] = useState(false);
  const hydrated = useHydration();

  useEffect(() => {
    if (__DEV__) {
      require('./ReactotronConfig');
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook(prev => !prev);
      });
    }
  }, []);

  if (__DEV__ && showStorybook) {
    const StorybookUI = require('./.storybook').default;
    return <StorybookUI />;
  }

  if (!hydrated) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
