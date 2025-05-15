import { ResponsiveGrid } from 'react-native-flexible-grid';

// Components
import { Skeleton } from './Skeleton';

// Constants
import { PRODUCT_HEIGHTS } from '@/constants';

const skeletonItems = [
  { id: 1, widthRatio: 1, heightRatio: 2 },
  { id: 2, widthRatio: 1, heightRatio: 2.5 },
  { id: 3, widthRatio: 1, heightRatio: 2 },
  { id: 4, widthRatio: 1, heightRatio: 2.5 },
  { id: 5, widthRatio: 1, heightRatio: 2 },
  { id: 6, widthRatio: 1, heightRatio: 2.5 },
  { id: 7, widthRatio: 1, heightRatio: 2 },
];
export const ProductsSkeleton = () => (
  <ResponsiveGrid
    maxItemsPerColumn={2}
    data={skeletonItems}
    itemUnitHeight={80}
    renderItem={({ index }) => <Skeleton height={PRODUCT_HEIGHTS[index % 2]} />}
    itemContainerStyle={{ padding: 7 }}
    showScrollIndicator={false}
  />
);
