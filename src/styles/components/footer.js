'use strict';

import variables from '../base/variables';

const { colors, sizes } = variables;

const mixin = {
  inlineDisplay: {
    display: 'inline-block',
    lineHeight: 1,
  },
};

export default {
  base: {
    backgroundColor: colors.font,
    color: colors.card,
    height: sizes.footerHeight,
    padding: '0 20px',
    textAlign: 'center',
  },
  text: {
    fontSize: '.9375em',
    fontWeight: 'bold',
    lineHeight: `${sizes.footerHeight}px`,
  },
  copyright: {
    ...mixin.inlineDisplay,
    marginRight: 5,
    verticalAlign: 'middle',
  },
  tracker: {
    ...mixin.inlineDisplay,
    borderLeft: `1px solid ${colors.card}`,
    borderRight: `1px solid ${colors.card}`,
    margin: '0 5px',
    padding: '0 5px',
  },
  github: {
    ...mixin.inlineDisplay,
  },
};
