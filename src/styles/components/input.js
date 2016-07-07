'use strict';

import variables from '../base/variables';
const { sizes, breakpoints } = variables;

const mixin = {
  newInput: {
    display: 'inline-block',
    verticalAlign: 'top',
    [`@media (max-width: ${breakpoints.first}px)`]: {
      display: 'block',
    },
  },
};

export default {
  input: {
    display: 'block',
    width: '100%',
  },
  newInput: {
    ...mixin.newInput,
    borderRadius: `${sizes.radius}px 0 0 ${sizes.radius}px`,
    marginBottom: 20,
    width: '80%',
    [`@media (min-width: ${breakpoints.first}px)`]: {
      width: '100%',
    },
    [`@media (min-width: ${breakpoints.second}px)`]: {
      width: 'calc(100% - 170px)',
    },
  },
  newButton: {
    ...mixin.newInput,
    borderRadius: `0 ${sizes.radius}px ${sizes.radius}px 0`,
    fontWeight: 'bold',
    padding: 13.5,
    width: '20%',
    [`@media (max-width: ${breakpoints.second}px)`]: {
      width: 'auto',
    },
    [`@media (min-width: ${breakpoints.second}px)`]: {
      width: 170,
    },
  },
};
