'use strict';

import variables from './variables';
import color from 'color';
const { colors, fonts, sizes } = variables;

export default {
  body: {
    backgroundColor: colors.background,
    boxSizing: 'border-box',
    color: colors.font,
    fontFamily: fonts.main,
    fontSize: fonts.size,
    lineHeight: 1,
    '-moz-osx-font-smoothing': 'grayscale',
    '-webkit-font-smoothing': 'antialiased',
  },
  '*': {
    boxSizing: 'inherit',
    lineHeight: 'inherit',
  },
  'p, h1, h2, h3, h4, h5, h6, ul': {
    margin: 0,
    padding: 0,
  },
  h1: {
    fontSize: '2.5em',
    fontWeight: 'normal',
  },
  h2: {
    fontSize: '1.8em',
  },
  h3: {
    fontSize: '1.5em',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  li: {
    listStyle: 'none',
  },
  'input, select': {
    border: `1px solid ${color(colors.font).alpha(0.1).rgbaString()}`,
    borderRadius: sizes.radius,
    outline: 'none',
    padding: '12px 15px',
  },
  'dl, dt, dd': {
    margin: 0,
  },
  'dt, dd': {
    display: 'inline-block',
    verticalAlign: 'top',
  },
  dt: {
    fontWeight: 'bold',
    marginBottom: 10,
    width: '40%',
  },
  dd: {
    width: '60%',
    marginBottom: 10,
  },
};
