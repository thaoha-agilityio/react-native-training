import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItemInfo,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRef, useState } from 'react';

// Components
import { Categories, Input, Text, Image, Button } from '@/components';
import {
  ChevronIcon,
  ClockIcon,
  LogoIcon,
  SearchBarIcon,
} from '@/components/icons';

// Constants
import { BANNER_DATA } from '@/constants';

// Types
import { Banner } from '@/interfaces';

// Themes
import { colors, fontsFamily } from '@/themes';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderItem = ({ item }: ListRenderItemInfo<Banner>) => (
    <View style={{ width: width * 0.9 }}>
      <Image source={item.image} contentFit="contain" style={styles.image} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logo}>
        <LogoIcon />
      </View>
      <View style={styles.input}>
        <Input
          placeholder="Search any Product..."
          variant="search"
          startContent={<SearchBarIcon />}
        />
        <Text variant="title" size="lg">
          All Featured
        </Text>
        <Categories />
      </View>

      <View style={styles.contentWrapper}>
        <FlatList
          data={BANNER_DATA}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={flatListRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          renderItem={renderItem}
        />

        {/* Pagination Dots */}
        <View style={styles.dots}>
          {BANNER_DATA.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    i === currentIndex ? colors.active : colors.pagination,
                },
              ]}
            />
          ))}
        </View>

        {/* Ads */}
        <View style={styles.ads}>
          <View>
            <Text style={styles.title} size="md">
              Deal of the Day
            </Text>
            <View style={styles.timeWrapper}>
              <ClockIcon />
              <Text style={styles.time} size="xs">
                22h 55m 20s remaining
              </Text>
            </View>
          </View>
          <Button variant="outline" style={styles.viewAllBtn}>
            <Text style={styles.viewAll} size="xs">
              View All
            </Text>
            <ChevronIcon />
          </Button>
        </View>
      </View>

      {/* Products */}
      <View style={styles.imgWrapper}>
        <Image
          source={require('@/assets/images/mac.jpg')}
          style={styles.image}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  logo: {
    marginTop: 12,
    alignItems: 'center',
  },

  input: {
    marginTop: 28,
    gap: 16,
  },

  contentWrapper: {
    marginTop: 16,
    height: 300,
  },

  image: {
    flex: 1,
  },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 5,
  },

  ads: {
    backgroundColor: colors.background.secondary,
    borderRadius: 8,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: colors.light,
    fontFamily: 'medium',
  },

  timeWrapper: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 4,
    marginTop: 8,
    alignItems: 'center',
  },

  time: {
    color: colors.light,
  },

  viewAll: {
    color: colors.light,
    fontFamily: fontsFamily.semiBold,
  },

  viewAllBtn: {
    width: 100,
    height: 30,
    borderColor: colors.light,
  },

  imgWrapper: {
    marginTop: 16,
    height: 172,
  },

  macImage: {
    flex: 1,
  },
});
