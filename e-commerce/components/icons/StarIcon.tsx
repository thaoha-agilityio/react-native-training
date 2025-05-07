import Svg, { Path, SvgProps } from 'react-native-svg';

export const StarIcon = ({ width = 14, height = 14, ...rest }: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...rest}>
    <Path
      fill="#F7B305"
      d="m6 8.908 3.605 2.175-.957-4.1 3.185-2.76-4.194-.355L6 0 4.36 3.868l-4.193.355 3.185 2.76-.957 4.1L6 8.908Z"
    />
  </Svg>
);
