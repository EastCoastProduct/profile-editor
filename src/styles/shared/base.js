'use strict';

import variables from '../base/variables';
import color from 'color';
const { breakpoints, colors, sizes } = variables;

const mixin = {
  card: {
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    boxShadow: `0 2px 10px ${colors.shadow}`,
    padding: 30,
  },
};

export default {
  content: {
    margin: '0 auto',
    minHeight: sizes.mainHeight,
    padding: `${sizes.headerHeight + 50}px 0`,
    width: sizes.container,
    [`@media (max-width: ${breakpoints.first}px)`]: {
      width: 310,
    },
    [`@media (min-width: ${breakpoints.first}px)`]: {
      width: '95%',
    },
  },
  card: {
    ...mixin.card,
    textAlign: 'center',
  },
  leftCard: {
    ...mixin.card,
    marginBottom: 20,
    textAlign: 'left',
  },
  errMsg: {
    color: colors.error,
    margin: '10px 0',
  },
  clearfix: {
    clear: 'both',
  },
  heading: {
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  labelText: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoMsg: {
    color: color(colors.font).lighten(3).rgbString(),
    fontStyle: 'italic',
  },
};
