import Svg, { Path, SvgProps } from 'react-native-svg';

export const ArrowLeftIcon = ({
  width = 9,
  height = 12,
  color = '#000',
  ...rest
}: SvgProps) => (
  <Svg width={12} height={21} fill="none" {...rest}>
    <Path
      stroke={color}
      strokeWidth={2}
      d="M10.5 1 1.707 9.793a1 1 0 0 0 0 1.414L10.5 20"
    />
  </Svg>
);
