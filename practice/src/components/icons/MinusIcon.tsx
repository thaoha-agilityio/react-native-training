import {Rect, Svg, SvgProps} from 'react-native-svg';

// Themes
import {colors} from '@/themes';

export const MinusIcon = ({
  width = 14,
  height = 2,
  color = colors.primary,
  ...rest
}: SvgProps) => (
  <Svg
    viewBox="0 0 14 2"
    fill="none"
    width={width}
    height={height}
    color={color}
    {...rest}>
    <Rect width={width} height={height} rx="1" fill={color} />
  </Svg>
);
