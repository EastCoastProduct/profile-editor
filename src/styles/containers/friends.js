'use strict';

import variables from '../base/variables';
const { colors } = variables;

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
  },
  label: {
    display: 'block',
    width: '100%',
  },
  trashIcon: {
    display: 'inline-block',
    fontSize: '2em',
    verticalAlign: 'middle',
    width: 60,
  },
};
