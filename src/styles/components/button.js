'use strict';

import variables from '../base/variables';
import color from 'color';
const { colors, sizes, transition } = variables;

const mixin = {
  baseBtn: {
    border: 0,
    borderRadius: sizes.radius,
    outline: 'none',
    padding: 15,
    transition: transition.base,
  },
};

export default {
  mainBtn: {
    ...mixin.baseBtn,
    backgroundColor: colors.mainBtn,
    color: colors.card,
    ':hover': {
      backgroundColor: color(colors.mainBtn).lighten(0.2).hexString(),
    },
  },
  emptyBtn: {
    ...mixin.baseBtn,
    backgroundColor: colors.card,
    color: colors.mainBtn,
    ':hover': {
      color: color(colors.mainBtn).lighten(0.2).hexString(),
    },
  },
};
