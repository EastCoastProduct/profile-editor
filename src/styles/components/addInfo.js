'use strict';

import variables from '../base/variables';
import color from 'color';
const { colors, transition } = variables;

export default {
  list: {
    marginBottom: 20,
  },
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
  infoMsg: {
    color: color(colors.font).lighten(3).rgbString(),
    fontStyle: 'italic',
    marginBottom: 20,
  },
};
