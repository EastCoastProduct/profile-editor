'use strict';

import variables from '../base/variables';
const { breakpoints, colors, sizes } = variables;

export default {
  base: {
    backgroundColor: colors.font,
    color: colors.card,
    height: sizes.headerHeight,
    padding: '0 20px',
    position: 'fixed',
    width: '100%',
    zIndex: 3,
    [`@media (max-width: ${breakpoints.first}px)`]: {
      width: 320,
    },
  },
  menuText: {
    cursor: 'pointer',
    lineHeight: `${sizes.headerHeight}px`,
  },
  menuIcon: {
    marginRight: 10,
  },
};
