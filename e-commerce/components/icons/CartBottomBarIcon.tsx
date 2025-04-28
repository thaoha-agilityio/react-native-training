import Svg, { Path, SvgProps } from 'react-native-svg';

export const CartBottomBarIcon = ({
  width = 24,
  height = 24,
  color = '#323232',
  ...rest
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...rest}>
    <Path
      stroke="#E9E9E9"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM20 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
    />
  </Svg>
);
