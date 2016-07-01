'use strict';

import variables from '../base/variables';
const { colors, sizes } = variables;

const mixin = {
  button: {
    fontSize: '1.125em',
    margin: '0 3px',
  },
};

export default {
  base: {
    borderTop: `1px solid ${colors.background}`,
    paddingTop: 30,
    textAlign: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  ul: {
    marginTop: 10,
  },
  selected: {
    ...mixin.button,
    color: colors.font,
    padding: '8px 12px',
  },
  button: {
    ...mixin.button,
    border: `1px solid ${colors.mainBtn}`,
    borderRadius: sizes.radius,
    padding: '7px 11px',
    ':hover': {
      backgroundColor: colors.mainBtn,
      color: colors.card,
    },
  },
  listAndItems: {
    display: 'inline-block',
    verticalAlign: 'middle',
  },
};
