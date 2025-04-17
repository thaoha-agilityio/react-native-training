import {NavigationContainer} from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';

// AppStacks
import {AppStackNavigation} from './AppStackNavigation';

// Config
import {linking} from '@/configs';

export const Navigation = () => {
  const handleReady = () => {
    BootSplash.hide();
  };

  return (
    <NavigationContainer onReady={handleReady} linking={linking}>
      <AppStackNavigation />
    </NavigationContainer>
  );
};
