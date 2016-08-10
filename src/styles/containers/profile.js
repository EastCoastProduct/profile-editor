'use strict';

import variables from '../base/variables';

const { breakpoints } = variables;

const mixin = {
  breakpoint: {
    [`@media (max-width: ${breakpoints.third}px)`]: {
      float: 'none',
      width: '100%',
    },
  },
};
export default {
  halfLeft: {
    float: 'left',
    marginRight: '1%',
    width: '49%',
    ...mixin.breakpoint,
  },
  halfRight: {
    float: 'right',
    marginLeft: '1%',
    width: '49%',
    ...mixin.breakpoint,
  },
};
