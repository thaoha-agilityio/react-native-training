import { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import { useRouter } from 'expo-router';

// Components
import { Text, Image, Button } from '@/components';

// Themes
import { colors, fontsFamily, fontSizes } from '@/themes';

// Constants
import { ONBOARDING_STEPS, ROUTES } from '@/constants';

// Stores
import { useBootstrapsStore } from '@/stores';
import { Onboarding } from '@/interfaces';

const { width } = Dimensions.get('window');
const OnboardingScreen = () => {
  const router = useRouter();
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

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: ListRenderItemInfo<Onboarding>) => (
    <View style={{ width: width * 0.9 }}>
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
  );

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
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
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
          {/* Pagination Dots */}
          <View style={styles.dots}>
            {ONBOARDING_STEPS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      i === currentIndex ? colors.dark : colors.pagination,
                  },
                  { width: i === currentIndex ? 40 : 8 },
                ]}
              />
            ))}
          </View>
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

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 17,
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

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },

  dot: {
    height: 8,
    borderRadius: 4,
    margin: 5,
  },
});
