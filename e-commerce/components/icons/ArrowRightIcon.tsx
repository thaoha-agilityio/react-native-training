import Svg, { Path, SvgProps } from 'react-native-svg';

export const ArrowRightIcon = ({
  width = 9,
  height = 12,
  ...rest
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...rest}>
    <Path
      fill="#232327"
      d="M2.02 0 .61 1.41 5.19 6 .61 10.59 2.02 12l6-6-6-6Z"
    />
  </Svg>
);
