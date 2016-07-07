'use strict';

import Radium from 'radium';

const spinnerKeyframe = Radium.keyframes({
  '0%': { transform: 'rotate(0)' },
  '100%': { transform: 'rotate(360deg)' },
});

export default {
  base: {
    animation: 'x 2s linear infinite',
    animationName: spinnerKeyframe,
    display: 'block',
    fontSize: '2em',
    margin: 20,
    textAlign: 'center',
  },
};
