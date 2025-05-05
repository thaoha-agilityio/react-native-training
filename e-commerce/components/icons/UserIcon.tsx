import Svg, { Path, SvgProps } from 'react-native-svg';

export const UserIcon = ({
  width = 24,
  height = 24,
  color = '#626262',
  ...rest
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...rest}>
    <Path
      fill={color}
      d="M9 14a5 5 0 0 0-5 5 3 3 0 0 0 3 3h10a3 3 0 0 0 3-3 5 5 0 0 0-5-5H9ZM12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
    />
  </Svg>
);
