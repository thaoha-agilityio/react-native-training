import { useState } from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
  useColorScheme,
} from 'react-native';
import { Dropdown as DropdownElement } from 'react-native-element-dropdown';

// Themes
import { colors, colorTheme, fontsFamily, fontSizes } from '@/themes';

// Components
import { Text } from '../Text';

type DropdownItem = {
  label: string;
  value: string | number;
};

interface DropdownProps {
  label?: string;
  data: DropdownItem[];
  value: string | number | null;
  errorMessage?: string;
  onChange: (value: string | number) => void;
  placeholder?: string;
  maxHeight?: number;
  style?: ViewStyle;
  dropdownStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export const Dropdown = ({
  label,
  data,
  value,
  errorMessage,
  onChange,
  placeholder = 'Select item',
  maxHeight = 300,
  style,
  dropdownStyle,
  textStyle,
}: DropdownProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const colorScheme = useColorScheme() ?? 'light';

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <View style={[styles.container, style]}>
      {!!label && <Text style={styles.label}>{label}</Text>}

      <DropdownElement
        style={[
          styles.dropdown,
          dropdownStyle,
          isFocus && { borderColor: colors.background.secondary },
        ]}
        placeholderStyle={[styles.placeholderStyle, textStyle]}
        selectedTextStyle={[
          styles.selectedTextStyle,
          { color: colorTheme[colorScheme].title },
        ]}
        data={data}
        maxHeight={maxHeight}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? placeholder : '...'}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        itemTextStyle={{ color: colorTheme[colorScheme].title }}
        containerStyle={[
          styles.containerStyle,
          { backgroundColor: colorTheme[colorScheme].background },
        ]}
        activeColor={colors.primary}
      />
      {!!errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
  },
  label: {
    fontSize: fontSizes.xs,
    fontFamily: fontsFamily.primary,
  },
  dropdown: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: fontSizes.sm,
  },
  selectedTextStyle: {
    fontSize: fontSizes.xs,
    fontFamily: fontsFamily.semiBold,
  },
  containerStyle: {
    borderRadius: 8,
  },
  errorMessage: {
    marginTop: 5,
    fontFamily: fontsFamily.primary,
    fontSize: fontSizes.xs,
    color: colors.error,
  },
});
