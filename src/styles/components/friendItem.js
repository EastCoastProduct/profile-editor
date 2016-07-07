'use strict';

import variables from '../base/variables';
const { colors, breakpoints } = variables;

export default {
  listItem: {
    borderTop: `1px solid ${colors.background}`,
    padding: 10,
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
    width: 'calc(100% - (100px + 60px))',
    [`@media (max-width: ${breakpoints.second}px)`]: {
      display: 'block',
      width: '100%',
    }
  },
  name: {
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
    display: 'inline-block',
    fontSize: '2em',
    verticalAlign: 'middle',
    width: 60,
    [`@media (max-width: ${breakpoints.first}px)`]: {
      padding: 0,
    },
  },
};
