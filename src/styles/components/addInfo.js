'use strict';

import variables from '../base/variables';
import color from 'color';
const { colors, transition } = variables;

export default {
  listItem: {
    marginBottom: 5,
  },
  listIcon: {
    color: colors.mainBtn,
    cursor: 'pointer',
    marginLeft: 10,
    transition: transition.base,
    ':hover': {
      color: color(colors.mainBtn).lighten(0.2).rgbString(),
    },
  },
  form: {
    marginTop: 20,
  },
};
