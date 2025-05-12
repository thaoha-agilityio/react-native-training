import Svg, { Path, SvgProps } from 'react-native-svg';

export const ChevronIcon = ({
  width = 14,
  height = 10,
  color = '#fff',
  ...rest
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...rest}>
    <Path
      fill={color}
      d="m9 .333-.94.94 3.053 3.06H.333v1.334h10.78l-3.06 3.06.947.94L13.667 5 9 .333Z"
    />
  </Svg>
);
