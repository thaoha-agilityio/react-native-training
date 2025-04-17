import {memo} from 'react';
import {View} from 'react-native';

// Components
import {Text} from '../Text';

// Styles
import {categoryStyles} from './styles';

// Themes
import {colors} from '@/themes';

interface CategoryProps {
  title: string;
  icon: JSX.Element;
  isEnable?: boolean;
}
const CategoryComponent = ({isEnable = false, title, icon}: CategoryProps) => {
  const backgroundIconClass = isEnable
    ? colors.dark
    : colors.background.disable;
  const colorTitleClass = isEnable
    ? categoryStyles.activeText
    : categoryStyles.inactiveText;

  return (
    <View style={categoryStyles.container}>
      <View
        style={[categoryStyles.icon, {backgroundColor: backgroundIconClass}]}>
        {icon}
      </View>
      <Text size="base" style={colorTitleClass}>
        {title}
      </Text>
    </View>
  );
};

export const Category = memo(CategoryComponent);
