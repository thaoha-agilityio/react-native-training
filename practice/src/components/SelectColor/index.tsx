import {memo} from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';

// Themes
import {colors} from '@/themes';

interface SelectColorPops {
  isActive?: boolean;
  bgColor: string;
  onPress?: () => void;
}

const SelectColorComponent = ({
  isActive = false,
  bgColor,
  onPress,
}: SelectColorPops) => {
  return (
    <TouchableHighlight onPress={onPress} testID="selected-color">
      <View
        style={[
          styles.wrapper,
          isActive ? styles.activeBg : styles.inactiveBg,
        ]}>
        <View style={[styles.circle, {backgroundColor: bgColor}]} />
      </View>
    </TouchableHighlight>
  );
};

export const SelectColor = memo(SelectColorComponent);

const styles = StyleSheet.create({
  wrapper: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    height: 24,
    width: 24,
    borderRadius: '50%',
  },

  activeBg: {
    backgroundColor: colors.text.secondary,
  },

  inactiveBg: {
    backgroundColor: colors.background.secondary,
  },
});
