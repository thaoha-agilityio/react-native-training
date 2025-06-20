import React, { memo, useRef, useMemo, useCallback } from 'react';
import { Pressable, TouchableHighlight, View, StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

// Themes
import { colors, fontsFamily, fontSizes } from '@/themes';

// Components
import { ArrowDownIcon } from '@/components/icons';
import { Text } from '../Text';

// Hooks
import { useTheme } from '@/hooks';

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  disabled?: boolean;
  label?: string;
  selectedValue?: string;
  errorMessage?: string;
  onSelect: (value: string) => void;
};

const DropdownComponent = ({
  options,
  disabled = false,
  label,
  selectedValue,
  errorMessage,
  onSelect,
}: DropdownProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const { colors: colorScheme } = useTheme();

  const rotation = useSharedValue(0);

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const selectedOption = useMemo(
    () => options.find(({ value }) => value === selectedValue),
    [options, selectedValue],
  );

  const handleOpenActionSheet = useCallback(() => {
    if (!disabled) {
      rotation.value = withTiming(180, { duration: 200 });
      actionSheetRef.current?.show();
    }
  }, [disabled, rotation]);

  const handleCloseActionSheet = useCallback(() => {
    rotation.value = withTiming(0, { duration: 200 });
    actionSheetRef.current?.hide();
  }, [rotation]);

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}

      <Pressable
        style={[styles.triggerContainer, disabled && styles.triggerDisabled]}
        onPress={handleOpenActionSheet}
      >
        <View style={styles.triggerSelectedLabel}>
          <Text
            style={[styles.selectedTextStyle, { color: colorScheme.title }]}
          >
            {selectedOption?.label || 'Select...'}
          </Text>

          <Animated.View style={arrowAnimatedStyle}>
            <ArrowDownIcon color={colorScheme.title} />
          </Animated.View>
        </View>
      </Pressable>

      <View>
        <ActionSheet ref={actionSheetRef} onClose={handleCloseActionSheet}>
          <View style={styles.contentContainer}>
            {options.map(({ value, label: optionLabel }) => {
              const isSelected = selectedOption?.value === value;

              return (
                <TouchableHighlight
                  key={value}
                  style={[
                    styles.containerStyle,
                    {
                      backgroundColor: isSelected
                        ? colors.primary
                        : colorScheme.background,
                    },
                  ]}
                  underlayColor={colors.primary}
                  onPress={() => {
                    onSelect(value);
                    handleCloseActionSheet();
                  }}
                >
                  <Text size="md">{optionLabel}</Text>
                </TouchableHighlight>
              );
            })}
          </View>
        </ActionSheet>
      </View>

      {!!errorMessage && (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      )}
    </>
  );
};

export const Dropdown = memo(DropdownComponent);

const styles = StyleSheet.create({
  label: {
    fontSize: fontSizes.xs,
    fontFamily: fontsFamily.primary,
  },
  triggerContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  triggerDisabled: {
    opacity: 0.8,
  },
  triggerSelectedLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 18,
    alignItems: 'center',
  },
  selectedTextStyle: {
    fontSize: fontSizes.xs,
    fontFamily: fontsFamily.semiBold,
  },
  contentContainer: {
    width: '100%',
  },
  containerStyle: {
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
  },
  errorMessage: {
    marginTop: 5,
    fontFamily: fontsFamily.primary,
    fontSize: fontSizes.xs,
    color: colors.error,
  },
});
