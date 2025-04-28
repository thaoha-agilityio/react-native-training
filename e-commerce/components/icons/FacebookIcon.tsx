import Svg, { Path, SvgProps } from 'react-native-svg';

export const FacebookIcon = ({
  width = 26,
  height = 26,
  ...rest
}: SvgProps) => (
  <Svg width={width} height={height} fill="none" {...rest}>
    <Path
      fill="#3D4DA6"
      d="M15.014 26V14.141h3.979l.597-4.623h-4.576V6.567c0-1.338.37-2.25 2.29-2.25l2.447-.001V.181C19.326.126 17.874 0 16.184 0c-3.528 0-5.944 2.154-5.944 6.109v3.409H6.25v4.623h3.99V26h4.774Z"
    />
  </Svg>
);
