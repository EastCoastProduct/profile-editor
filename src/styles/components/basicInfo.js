'use strict';

import variables from '../base/variables';

const { breakpoints } = variables;

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
  breakpoint: {
    [`@media (max-width: ${breakpoints.third}px)`]: {
      display: 'block',
      width: '100%',
    },
  },
};

export default {
  firstName: {
    ...mixin.label,
    marginRight: '2%',
    width: '38%',
    ...mixin.breakpoint,
  },
  lastName: {
    ...mixin.label,
    marginRight: '1%',
    width: '29%',
    ...mixin.breakpoint,
  },
  nickName: {
    ...mixin.label,
    marginLeft: '1%',
    width: '29%',
    ...mixin.breakpoint,
  },
  fullName: {
    ...mixin.nameAndGender,
    marginRight: '1%',
    ...mixin.breakpoint,
  },
  gender: {
    ...mixin.nameAndGender,
    marginLeft: '1%',
    ...mixin.breakpoint,
  },
};
