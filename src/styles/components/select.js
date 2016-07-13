'use strict';

import variables from '../base/variables';
const { colors, sizes } = variables;

export default {
  holder: {
    display: 'block',
    position: 'relative',
  },
  spinnerHolder: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: sizes.radius,
    display: 'flex',
    height: 'calc(100% - 2px)',
    padding: '0 6px',
    position: 'absolute',
    right: 1,
    top: 1,
  },
  spinner: {
    fontSize: '1em',
    margin: 0,
  },
  base: {
    backgroundColor: colors.background,
    display: 'block',
    height: 44,
    width: '100%',
  },
};
