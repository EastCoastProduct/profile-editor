'use strict';

import color from 'color';

export default {
  fonts: {
    main: 'Helvetica',
    size: 16,
  },
  colors: {
    background: '#efefef',
    card: '#fff',
    error: '#f00',
    errorLight: '#fdd',
    font: '#262626',
    link: '#FE8069',
    mainBtn: '#FF5F6D',
    navigation: '#333',
    get shadow() {
      return color(this.font).alpha(0.15).rgbaString();
    },
  },
  sizes: {
    container: 1300,
    footerHeight: 45,
    headerHeight: 70,
    get mainHeight() {
      return `calc(100vh - ${this.footerHeight}px)`;
    },
    opacity: 0.8,
    opacityLow: 0.6,
    radius: 3,
  },
  transition: {
    base: 'all 0.3s',
  },
  breakpoints: {
    first: 320,
    second: 520,
    third: 730,
  },
};
