'use strict';

import variables from '../base/variables';
const { colors, sizes } = variables;

export default {
  content: {
    margin: '0 auto',
    minHeight: sizes.mainHeight,
    padding: '50px 0',
    width: sizes.container,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    boxShadow: `0 2px 10px ${colors.shadow}`,
    padding: 30,
    textAlign: 'center',
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
};
