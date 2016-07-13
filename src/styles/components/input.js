'use strict';

import variables from '../base/variables';
const { colors, sizes } = variables;

const mixin = {
  newInput: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
};

export default {
  holder: {
    display: 'block',
    position: 'relative',
  },
  newHolder: {
    marginBottom: 20,
  },
  input: {
    display: 'block',
    width: '100%',
  },
  newInput: {
    ...mixin.newInput,
    borderRadius: `${sizes.radius}px 0 0 ${sizes.radius}px`,
    width: '80%',
  },
  newButton: {
    ...mixin.newInput,
    borderRadius: `0 ${sizes.radius}px ${sizes.radius}px 0`,
    fontWeight: 'bold',
    padding: 13.5,
    width: '20%',
  },
  invalid: {
    border: `1px solid ${colors.error}`,
  },
  spinnerHolder: {
    alignItems: 'center',
    backgroundColor: colors.card,
    display: 'flex',
    height: 'calc(100% - 2px)',
    padding: '0 6px',
    position: 'absolute',
    right: 1,
    top: 1,
  },
  spinner: {
    display: 'inline-block',
    fontSize: '1em',
    margin: 0,
  },
};
