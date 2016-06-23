'use strict';

import variables from '../base/variables';
const { sizes } = variables;

const mixin = {
  newInput: {
    display: 'inline-block',
    verticalAlign: 'top',
  },
};

export default {
  input: {
    display: 'block',
    width: '100%',
  },
  newInput: {
    ...mixin.newInput,
    borderRadius: `${sizes.radius}px 0 0 ${sizes.radius}px`,
    marginBottom: 20,
    width: '80%',
  },
  newButton: {
    ...mixin.newInput,
    borderRadius: `0 ${sizes.radius}px ${sizes.radius}px 0`,
    fontWeight: 'bold',
    padding: 13.5,
    width: '20%',
  },
};
