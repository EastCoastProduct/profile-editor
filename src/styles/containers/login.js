'use strict';

import variables from '../base/variables';
const { breakpoints } = variables;

export default {
  base: {
    margin: '0 auto',
    width: '50%',
    [`@media (max-width: ${breakpoints.first}px)`]: {
      width: '90%',
    },
  },
  heading: {
    marginBottom: 20,
  },
  button: {
    width: '50%',
    [`@media (max-width: ${breakpoints.first}px)`]: {
      width: '100%',
    },
  },
};
