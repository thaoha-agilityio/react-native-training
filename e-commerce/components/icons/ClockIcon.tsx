import Svg, { Path, SvgProps } from 'react-native-svg';

export const ClockIcon = ({
  width = 14,
  height = 14,
  color = '#fff',
  ...rest
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...rest}>
    <Path
      fill={color}
      d="M13.667 2.8 10.6.2l-.867 1L12.8 3.8l.867-1Zm-9.4-1.533-.867-1L.333 2.8l.867 1 3.067-2.533Zm3.066 3.066h-1v4l3.134 1.934.533-.8-2.667-1.6V4.333ZM7 1.667c-3.333 0-6 2.666-6 6 0 3.333 2.667 6 6 6s6-2.667 6-6c0-3.334-2.667-6-6-6Zm0 10.666a4.638 4.638 0 0 1-4.667-4.666C2.333 5.067 4.4 3 7 3c2.6 0 4.667 2.067 4.667 4.667 0 2.6-2.067 4.666-4.667 4.666Z"
    />
  </Svg>
);
