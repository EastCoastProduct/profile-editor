'use strict';

import color from 'color';
import variables from '../base/variables';

const { breakpoints, colors, sizes, transition } = variables;

const mixin = {
  coverForm: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
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
  profileForm: {
    color: colors.card,
    left: 5,
    position: 'absolute',
    bottom: 5,
    width: 'calc(100% - 10px)',
  },
  profileBtn: {
    cursor: 'pointer',
    display: 'block',
    textAlign: 'center',
    transition: transition.base,
  },
  coverSpinner: {
    backgroundColor: colors.card,
    padding: 10,
  },
  profileSpinner: {
    backgroundColor: color(colors.font).lighten(0.5).alpha(sizes.opacityLow)
                       .rgbaString(),
    padding: 10,
  },
  nameAndLink: {
    position: 'absolute',
    left: 20,
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
    [`@media (max-width: ${breakpoints.second}px)`]: {
      height: 120,
    },
  },
  figure: {
    backgroundColor: colors.card,
    borderRadius: sizes.radius,
    bottom: 30,
    padding: 5,
    left: 30,
    margin: 0,
    position: 'absolute',
    [`@media (max-width: ${breakpoints.second}px)`]: {
      position: 'relative',
      bottom: 180,
      right: 270,
      left: 'auto',
      top: 'auto,',
      width: 210,
    },
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
    [`@media (max-width: ${breakpoints.second}px)`]: {
      ...mixin.nameAndLink,
      bottom: 20,
    },
  },
  linkAnchor: {
    [`@media (max-width: ${breakpoints.second}px)`]: {
      ...mixin.nameAndLink,
      bottom: 10,
    },
  },
  linkIcon: {
    marginRight: 10,
  },
  coverForm: {
    ...mixin.coverForm,
  },
  profileForm: {
    ...mixin.profileForm,
  },
  coverBtn: {
    ...mixin.coverBtn,
    ...mixin.coverSpinner,
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
    ...mixin.profileSpinner,
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
  coverSpinnerHolder: {
    ...mixin.coverForm,
    ...mixin.coverBtn,
    ...mixin.coverSpinner,
  },
  coverSpinner: {
    fontSize: '1em',
    margin: 0,
  },
  profileSpinnerHolder: {
    ...mixin.profileForm,
    ...mixin.profileBtn,
    ...mixin.profileSpinner,
  },
};
