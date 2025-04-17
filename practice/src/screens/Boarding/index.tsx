import {useCallback} from 'react';

import {ImageBackground, StyleSheet, View} from 'react-native';

// Components
import {Button, Text} from '@/components';

// Constants
import {SCREENS} from '@/constants';

// Interfaces
import {AppStackScreenProps} from '@/interfaces';

// Themes
import {fontsFamily, colors, fontSizes} from '@/themes';

type BoardingScreenProps = AppStackScreenProps<typeof SCREENS.BOARDING>;

export const BoardingScreen = ({navigation}: BoardingScreenProps) => {
  const handleLogin = useCallback(() => {
    navigation.navigate(SCREENS.LOGIN);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/boarding.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.content}>
          <Text style={styles.heading} size="xl">
            MAKE YOUR
          </Text>
          <Text size="xxl" style={styles.title}>
            HOME BEAUTIFUL
          </Text>
          <Text style={styles.description}>
            The best simple place where you discover most wonderful furniture
            and make your home beautiful
          </Text>

          <View style={styles.buttonWrapper}>
            <Button
              style={styles.button}
              extraTextStyle={styles.buttonText}
              onPress={handleLogin}
              title="Get Started"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    marginBottom: 150,
    paddingLeft: 30,
  },
  heading: {
    fontFamily: fontsFamily.secondarySemiBold,
    marginBottom: 15,
    color: colors.text.helper,
  },
  title: {
    marginBottom: 35,
    fontFamily: fontsFamily.secondaryBold,
    color: colors.text.primary,
  },
  description: {
    paddingHorizontal: 30,
    textAlign: 'justify',
    lineHeight: 35,
    fontSize: fontSizes.md,
    color: colors.text.review,
    fontFamily: fontsFamily.primary,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  button: {
    width: 159,
    height: 54,
    marginTop: 154,
    paddingBottom: 7,
  },
  buttonText: {
    fontFamily: fontsFamily.secondarySemiBold,
  },
});
