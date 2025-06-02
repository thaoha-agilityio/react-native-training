import { Path, Svg, SvgProps } from 'react-native-svg';

// Themes
import { colors } from '@/themes';

export const ArrowDownIcon = ({
  width = 12,
  height = 5,
  color = colors.dark,
  ...rest
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    color={color}
    viewBox="0 0 12 5"
    fill="none"
    {...rest}
  >
    <Path
      d="M0.223633 0.681819L1.09785 6.35575e-07L5.68632 3.62709L10.2748 2.68415e-07L11.149 0.681818L5.68628 5L0.223633 0.681819Z"
      fill="currentColor"
    />
  </Svg>
);
