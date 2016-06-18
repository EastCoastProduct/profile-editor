'use strict';

import variables from '../base/variables';
import color from 'color';
const { colors, sizes, transition } = variables;

export default {
  basicInfo: {
    backgroundImage: 'url(http://www.addcovers.com/covers/q5osc38bv7er7me.jpg)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    marginBottom: 30,
    overflow: 'hidden',
    padding: '200px 0 0',
    position: 'relative',
  },
  info: {
    backgroundColor: colors.card,
    padding: '30px 30px 30px 300px',
    position: 'relative',
    textAlign: 'left',
  },
  figure: {
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    bottom: 30,
    padding: 5,
    left: 30,
    margin: 0,
    position: 'absolute',
  },
  image: {
    borderRadius: sizes.radius,
    height: 200,
    objectFit: 'cover',
    width: 200,
  },
  name: {
    marginBottom: 10,
  },
  linkIcon: {
    marginRight: 10,
  },
  coverForm: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  profileForm: {
    color: colors.card,
    left: 5,
    position: 'absolute',
    bottom: '15%',
    width: 'calc(100% - 10px)',
  },
  coverBtn: {
    backgroundColor: colors.card,
    borderBottomLeftRadius: sizes.radius,
    boxShadow: `0 2px 10px ${colors.shadow}`,
    cursor: 'pointer',
    display: 'block',
    opacity: sizes.opacity,
    padding: 10,
    textTransform: 'uppercase',
    transition: transition.base,
    ':hover': {
      boxShadow: `0 2px 20px ${colors.shadow}`,
      opacity: 1,
    },
  },
  profileBtn: {
    backgroundColor: color(colors.font).lighten(0.5).alpha(0.6)
                       .rgbaString(),
    cursor: 'pointer',
    display: 'block',
    padding: 10,
    textAlign: 'center',
    transition: transition.base,
    ':hover': {
      backgroundColor: color(colors.font).lighten(0.5).alpha(0.8)
                         .rgbaString(),
    },
  },
  file: {
    display: 'none',
  },
  cameraIcon: {
    display: 'block',
    marginBottom: 10,
  },
};
