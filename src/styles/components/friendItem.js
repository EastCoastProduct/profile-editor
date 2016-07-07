'use strict';

import variables from '../base/variables';
import color from 'color';
const { breakpoints, colors } = variables;

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
    [`@media (max-width: ${breakpoints.second}px)`]: {
      display: 'block',
      width: '100%',
    },
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
    [`@media (max-width: ${breakpoints.third}px)`]: {
      overflow: 'overlay',
      textOverflow: 'ellipsis',
    },
  },
  trashIcon: {
    ...mixin.icon,
    [`@media (max-width: ${breakpoints.first}px)`]: {
      padding: 0,
    },
  },
  reloadIcon: {
    ...mixin.icon,
    color: colors.font,
    ':hover': {
      color: color(colors.font).lighten(3).hexString(),
    },
  },
};
