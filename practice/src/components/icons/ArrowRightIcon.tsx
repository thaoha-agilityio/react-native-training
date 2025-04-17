import {Path, Svg, SvgProps} from 'react-native-svg';

// Themes
import {colors} from '@/themes';

export const ArrowRightIcon = ({
  width = 10,
  height = 18,
  color = colors.light,
  ...rest
}: SvgProps) => (
  <Svg
    viewBox="0 0 10 18"
    fill="none"
    width={width}
    height={height}
    color={color}
    {...rest}>
    <Path
      d="M0.999998 17L9 9L0.999997 0.999997"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
