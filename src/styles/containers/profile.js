'use strict';

import variables from '../base/variables';
const { breakpoints } = variables;

export default {
  halfLeft: {
    float: 'left',
    marginRight: '1%',
    width: '49%',
    [`@media (max-width: ${breakpoints.third}px)`]: {
      float: 'none',
      width: '100%',
    },
  },
  halfRight: {
    float: 'right',
    marginLeft: '1%',
    width: '49%',
    [`@media (max-width: ${breakpoints.third}px)`]: {
      width: '100%',
      float: 'none',
    },
  },
};
