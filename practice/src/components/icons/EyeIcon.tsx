import {Path, Svg, SvgProps} from 'react-native-svg';

// Themes
import {colors} from '@/themes';

export const EyeIcon = ({
  width = 20,
  height = 20,
  color = colors.dark,
  ...rest
}: SvgProps) => (
  <Svg
    viewBox="0 0 20 20"
    fill="none"
    width={width}
    height={height}
    color={color}
    {...rest}>
    <Path
      d="M2 9.5S4.91 4 10 4s8 5.5 8 5.5-2.91 5.5-8 5.5-8-5.5-8-5.5z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 12c1.105 0 2-1.12 2-2.5S11.105 7 10 7 8 8.12 8 9.5s.895 2.5 2 2.5z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
