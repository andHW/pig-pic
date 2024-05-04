import { ComponentPropsWithoutRef } from 'react';
import tape from '/src/assets/tape.png';

type TapeImgProps = ComponentPropsWithoutRef<'img'>;

export const TapeImg = ({ style, ...props }: TapeImgProps): JSX.Element => (
  <img src={tape} height='64px'
    style={{zIndex: 7853, opacity:0.5, transform: 'rotate(24deg)', pointerEvents: 'none', ...style}}
    {...props}
  />
);