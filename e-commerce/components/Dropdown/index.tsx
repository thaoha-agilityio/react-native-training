import { memo, useRef, useMemo, useCallback } from 'react';
import { Pressable, TouchableHighlight, View, StyleSheet } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

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

  const selectedOption = useMemo(
    () => options.find(({ value }) => value === selectedValue),
    [options, selectedValue],
  );

  const handleOpenActionSheet = useCallback(() => {
    if (!disabled) {
      actionSheetRef.current?.show();
    }
  }, [disabled]);

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
            {selectedOption?.label}
          </Text>

          <ArrowDownIcon color={colorScheme.title} />
        </View>
      </Pressable>

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.contentContainer}>
          {options.map(({ value, label: optionLabel }) => {
            const isSelected = selectedOption?.value === value;

            const handleSelectOption = () => {
              onSelect(value);
              actionSheetRef.current?.hide();
            };

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
                onPress={handleSelectOption}
              >
                <Text size="md">{optionLabel}</Text>
              </TouchableHighlight>
            );
          })}
        </View>
      </ActionSheet>
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
  dropdown: {
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  selectedTextStyle: {
    fontSize: fontSizes.xs,
    fontFamily: fontsFamily.semiBold,
  },

  containerStyle: {
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
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

  contentContainer: {
    width: '100%',
  },

  dropdownItem: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorMessage: {
    marginTop: 5,
    fontFamily: fontsFamily.primary,
    fontSize: fontSizes.xs,
    color: colors.error,
  },
});
