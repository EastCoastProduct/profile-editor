'use strict';

import variables from '../base/variables';
const { breakpoints } = variables;

const breakpoint = {
  fullBlock: {
    display: 'block',
    width: '100%'
  }
}
const mixin = {
  label: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginBottom: 20,
  },
  nameAndGender: {
    display: 'inline-block',
    verticalAlign: 'top',
    width: '49%',
  },
};

export default {
  firstName: {
    ...mixin.label,
    marginRight: '2%',
    width: '38%',
    [`@media (max-width: ${breakpoints.third}px)`]: {
      ...breakpoint.fullBlock,
    },
  },
  lastName: {
    ...mixin.label,
    marginRight: '1%',
    width: '29%',
    [`@media (max-width: ${breakpoints.third}px)`]: {
      ...breakpoint.fullBlock,
    },

  },
  nickName: {
    ...mixin.label,
    marginLeft: '1%',
    width: '29%',
    [`@media (max-width: ${breakpoints.third}px)`]: {
      ...breakpoint.fullBlock,
    }
  },
  fullName: {
    ...mixin.nameAndGender,
    marginRight: '1%',
    [`@media (max-width: ${breakpoints.third}px)`]: {
      ...breakpoint.fullBlock,
    }
  },
  gender: {
    ...mixin.nameAndGender,
    marginLeft: '1%',
    [`@media (max-width: ${breakpoints.third}px)`]: {
      ...breakpoint.fullBlock,
    }
  },
};
