import tape from '/src/assets/tape.png';

export const TapeImg = (): JSX.Element => (
  <img src={tape} height='64px'
    style={{position:'absolute', zIndex: 7853, opacity:0.5, transform: 'rotate(24deg)', pointerEvents: 'none'}}
  />
);
