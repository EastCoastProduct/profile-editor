'use strict';

import variables from '../base/variables';
import color from 'color';
const { colors } = variables;

const mixin = {
  icon: {
    display: 'inline-block',
    fontSize: '2em',
    margin: '0 2px',
    verticalAlign: 'middle',
    width: 60,
  },
};

export default {
  listItem: {
    borderTop: `1px solid ${colors.background}`,
    padding: 10,
  },
  errItem: {
    backgroundColor: colors.errorLight,
  },
  image: {
    border: `1px solid ${colors.background}`,
    borderRadius: '50%',
    display: 'inline-block',
    height: 100,
    objectFit: 'cover',
    objectPosition: 'center',
    verticalAlign: 'middle',
    width: 100,
  },
  details: {
    display: 'inline-block',
    padding: 20,
    verticalAlign: 'middle',
    width: 'calc(100% - (100px + 64px))',
  },
  errDetails: {
    width: 'calc(100% - (100px + 128px))',
  },
  text: {
    marginBottom: 10,
  },
  email: {
    fontStyle: 'italic',
    marginBottom: 10,
  },
  link: {
    color: colors.link,
    display: 'block',
  },
  trashIcon: {
    ...mixin.icon,
  },
  reloadIcon: {
    ...mixin.icon,
    color: colors.font,
    ':hover': {
      color: color(colors.font).lighten(3).hexString(),
    },
  },
};
