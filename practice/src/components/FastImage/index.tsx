import {memo, useState} from 'react';
import FastImageBase, {FastImageProps} from 'react-native-fast-image';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

// Constants
import {FALLBACK_IMAGE} from '@/constants';

interface Props extends Partial<FastImageProps> {
  uri?: string;
  fallbackImage?: string;
}

const FastImageComponent = ({
  uri,
  fallbackImage = FALLBACK_IMAGE,
  style,
  ...props
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadEnd = () => setIsLoading(false);

  const handleError = () => setHasError(true);

  return (
    <View style={[styles.container, style]}>
      {isLoading && <ActivityIndicator style={styles.loader} size="small" />}

      <FastImageBase
        source={{
          uri: hasError || !uri ? fallbackImage : uri,
        }}
        style={StyleSheet.absoluteFill}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    position: 'absolute',
    zIndex: 1,
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});

export const FastImage = memo(FastImageComponent);
