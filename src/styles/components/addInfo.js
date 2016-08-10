'use strict';

import color from 'color';
import variables from '../base/variables';

const { colors, transition } = variables;

const mixin = {
  icon: {
    color: colors.mainBtn,
    fontSize: '1em',
    margin: '0 0 0 10px',
  },
};

export default {
  listItem: {
    marginBottom: 5,
  },
  listIcon: {
    ...mixin.icon,
    cursor: 'pointer',
    transition: transition.base,
    ':hover': {
      color: color(colors.mainBtn).lighten(0.2).rgbString(),
    },
  },
  spinner: {
    ...mixin.icon,
    display: 'inline-block',
  },
  form: {
    marginTop: 20,
  },
};
