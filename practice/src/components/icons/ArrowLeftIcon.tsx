import {Path, Svg, SvgProps} from 'react-native-svg';

// Themes
import {colors} from '@/themes';

export const ArrowLeftIcon = ({
  width = 28,
  height = 22,
  color = colors.primary,
  ...rest
}: SvgProps) => (
  <Svg width={width} height={height} viewBox="0 0 20 20" fill="none" {...rest}>
    <Path
      d="M13.25 3.5L6.75 10L13.25 16.5"
      stroke={color}
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);
