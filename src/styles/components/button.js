'use strict';

import variables from '../base/variables';
import color from 'color';
const { colors, sizes, transition } = variables;

const mixin = {
  baseBtn: {
    border: 0,
    borderRadius: sizes.radius,
    color: colors.card,
    outline: 'none',
    padding: 15,
    transition: transition.base,
  },
};

export default {
  mainBtn: {
    ...mixin.baseBtn,
    backgroundColor: colors.mainBtn,
    ':hover': {
      backgroundColor: color(colors.mainBtn).lighten(0.2).hexString(),
    },
  },
};
