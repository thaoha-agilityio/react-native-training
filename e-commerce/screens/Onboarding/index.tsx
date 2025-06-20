import { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ListRenderItemInfo,
  Dimensions,
  ViewToken,
} from 'react-native';
import { router } from 'expo-router';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

// Components
import { Text, Button, PaginationDot } from '@/components';
import ListItem from './ListItem';

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
  const setFirstLoad = useBootstrapsStore((state) => state.setIsFirstLoad);
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<Animated.FlatList<Onboarding>>();

  const scrollToNext = () => {
    if (currentIndex < ONBOARDING_STEPS.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      setFirstLoad(false);
      router.replace(ROUTES.LOGIN); // navigate after onboarding
    }
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
      // derive page index from offset
      const index = Math.round(event.contentOffset.x / width);
      runOnJS(setCurrentIndex)(index);
    },
  });

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
      flatListIndex.value = viewableItems[0].index ?? 0;
    }
  };

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<Onboarding>) => (
      <ListItem item={item} index={index} x={x} />
    ),
    [x],
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
        <Animated.FlatList
          ref={flatListRef}
          data={ONBOARDING_STEPS}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          keyExtractor={getKeyExtractor}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
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

  bottomContainer: {
    marginBottom: 22,
    marginTop: 160,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
