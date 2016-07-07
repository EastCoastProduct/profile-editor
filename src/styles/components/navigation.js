'use strict';

import variables from '../base/variables';
import color from 'color';
const { breakpoints, colors, transition } = variables;

export default {
  overlay: {
    backgroundColor: color(colors.font).alpha(0.5).rgbaString(),
    height: '100vh',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100vw',
    zIndex: 1,
  },
  navigation: {
    backgroundColor: colors.navigation,
    height: '100vh',
    left: 0,
    overflow: 'auto',
    position: 'fixed',
    top: 0,
    zIndex: 2,
  },
  navText: {
    [`@media (max-width: ${breakpoints.second}px)`]: {
      display: 'none',
    },
  },
  navItem: {
    display: 'block',
    fontSize: '1.2em',
    padding: '20px 50px 20px 10px',
    transition: transition.base,
    ':hover': {
      backgroundColor: colors.font,
    },
    [`@media (max-width: ${breakpoints.second}px)`]: {
      width: 50,
    },
  },
  navActive: {
    backgroundColor: color(colors.navigation).lighten(0.5).rgbString(),
  },
  navIcon: {
    marginRight: 5,
  },
};
