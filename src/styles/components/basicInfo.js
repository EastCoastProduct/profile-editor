'use strict';

import variables from '../base/variables';
import color from 'color';
const { colors, sizes, transition } = variables;

const mixin = {
  coverBtn: {
    boxShadow: `0 2px 10px ${colors.shadow}`,
    cursor: 'pointer',
    display: 'inline-block',
    opacity: sizes.opacity,
    transition: transition.base,
    verticalAlign: 'top',
    ':hover': {
      boxShadow: `0 2px 20px ${colors.shadow}`,
      opacity: 1,
    },
  },
  profileBtn: {
    cursor: 'pointer',
    display: 'block',
    textAlign: 'center',
    transition: transition.base,
  },
};

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
    display: 'block',
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
    bottom: 5,
    width: 'calc(100% - 10px)',
  },
  coverBtn: {
    ...mixin.coverBtn,
    backgroundColor: colors.card,
    padding: 10,
    textTransform: 'uppercase',
  },
  trashCoverBtn: {
    ...mixin.coverBtn,
    backgroundColor: colors.mainBtn,
    borderBottomLeftRadius: sizes.radius,
    color: colors.card,
    padding: '9.5px 13px',
  },
  profileBtn: {
    ...mixin.profileBtn,
    backgroundColor: color(colors.font).lighten(0.5).alpha(sizes.opacityLow)
                       .rgbaString(),
    padding: 10,
    ':hover': {
      backgroundColor: color(colors.font).lighten(0.5).alpha(sizes.opacity)
                         .rgbaString(),
    },
  },
  trashProfileBtn: {
    ...mixin.profileBtn,
    backgroundColor: color(colors.mainBtn).alpha(sizes.opacityLow).rgbaString(),
    padding: 8,
    ':hover': {
      backgroundColor: color(colors.mainBtn).alpha(sizes.opacity).rgbaString(),
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
