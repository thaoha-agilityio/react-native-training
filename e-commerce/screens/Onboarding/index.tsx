import { useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Dimensions,
  ViewToken,
} from 'react-native';
import { router } from 'expo-router';

// Components
import { Text, Image, Button, PaginationDot } from '@/components';

// Themes
import { colors, fontsFamily, fontSizes } from '@/themes';

// Constants
import { ONBOARDING_STEPS, ROUTES, VIEWABILITY_CONFIG } from '@/constants';

// Stores
import { useBootstrapsStore } from '@/stores';

// Types
import { Onboarding } from '@/interfaces';

const width = Dimensions.get('screen').width;

export const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const setFirstLoad = useBootstrapsStore((state) => state.setIsFirstLoad);

  const scrollToNext = () => {
    if (currentIndex < ONBOARDING_STEPS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setFirstLoad(false);
      router.replace(ROUTES.LOGIN); // navigate after onboarding
    }
  };

  const scrollToPrev = () => {
    if (currentIndex === 0) return;

    flatListRef.current?.scrollToIndex({ index: currentIndex - 1 });
  };

  const handleSkip = () => {
    setFirstLoad(false);
    router.replace(ROUTES.LOGIN);
  };

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0);
    }
  };

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Onboarding>) => (
      <View style={{ width: width - 34 }}>
        <Image source={item.image} style={styles.image} contentFit="contain" />

        <View style={styles.textWrapper}>
          <Text variant="title" size="xxl" style={styles.title}>
            {item.title}
          </Text>
          <Text
            variant="description"
            style={styles.description}
            numberOfLines={3}
          >
            {item.description}
          </Text>
        </View>
      </View>
    ),
    [],
  );

  const getKeyExtractor = useCallback((item: Onboarding) => item.id, []);

  return (
    <View style={styles.container}>
      <View style={styles.step}>
        <Text variant="title" size="lg">
          {currentIndex + 1}
          <Text size="lg" style={styles.number}>
            /{ONBOARDING_STEPS.length}
          </Text>
        </Text>
        <Button
          title="Skip"
          variant="text"
          extraTextStyle={styles.skipButton}
          onPress={handleSkip}
        />
      </View>

      <View style={styles.contentWrapper}>
        <FlatList
          data={ONBOARDING_STEPS}
          keyExtractor={getKeyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={VIEWABILITY_CONFIG}
          renderItem={renderItem}
        />

        <View style={styles.bottomContainer}>
          <Button
            title="Prev"
            variant="text"
            onPress={scrollToPrev}
            extraTextStyle={{
              color: currentIndex === 0 ? colors.pagination : colors.primary,
            }}
          />

          <PaginationDot
            currentIndex={currentIndex}
            items={ONBOARDING_STEPS}
            activeColor={colors.dark}
            widthActive={40}
          />

          {currentIndex < ONBOARDING_STEPS.length - 1 ? (
            <Button title="Next" variant="text" onPress={scrollToNext} />
          ) : (
            <Button title="Get Started" variant="text" onPress={handleSkip} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
    paddingTop: 20,
  },

  step: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  number: {
    fontFamily: fontsFamily.semiBold,
    color: colors.text.helper,
  },

  skipButton: {
    fontFamily: fontsFamily.semiBold,
    color: colors.dark,
    fontSize: fontSizes.lg,
  },

  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },

  image: {
    flex: 1,
    paddingHorizontal: 30,
  },

  textWrapper: {
    marginTop: 33,
  },

  title: {
    textAlign: 'center',
  },

  description: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: fontsFamily.semiBold,
  },

  bottomContainer: {
    marginBottom: 22,
    marginTop: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
