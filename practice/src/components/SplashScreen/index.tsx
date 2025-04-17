import {memo, useState} from 'react';
import {Animated, Image} from 'react-native';
import BootSplash from 'react-native-bootsplash';

const SplashScreenComponent = () => {
  const [opacity] = useState(() => new Animated.Value(1));

  const {container, logo} = BootSplash.useHideAnimation({
    manifest: require('@/assets/bootsplash/manifest.json'),

    logo: require('@/assets/bootsplash/logo.png'),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      // Perform animations and call onAnimationEnd
      Animated.timing(opacity, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
      });
    },
  });

  return (
    <Animated.View {...container} style={[container.style, {opacity}]}>
      <Image {...logo} />
    </Animated.View>
  );
};

export const SplashScreen = memo(SplashScreenComponent);
