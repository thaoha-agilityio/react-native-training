import Svg, { Path, G, Defs, SvgProps, ClipPath } from 'react-native-svg';

export const CartIcon = ({
  width = 20,
  height = 20,
  color = '#323232',
  ...rest
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...rest}>
    <G clipPath="url(#a)">
      <Path
        fill={color}
        d="M5.833 15c-.916 0-1.658.75-1.658 1.667 0 .916.742 1.666 1.658 1.666.917 0 1.667-.75 1.667-1.666C7.5 15.75 6.75 15 5.833 15Zm8.334 0c-.917 0-1.659.75-1.659 1.667 0 .916.742 1.666 1.659 1.666.916 0 1.666-.75 1.666-1.666 0-.917-.75-1.667-1.666-1.667Zm-1.209-4.167c.625 0 1.175-.341 1.459-.858L17.4 4.567a.83.83 0 0 0-.725-1.234H4.342l-.784-1.666H.833v1.666H2.5l3 6.325-1.125 2.034c-.608 1.116.192 2.475 1.458 2.475h10V12.5h-10l.917-1.667h6.208ZM5.133 5h10.125l-2.3 4.167h-5.85L5.133 5Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
