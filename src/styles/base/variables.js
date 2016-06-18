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
    font: '#262626',
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
      return `calc(100vh - ${this.headerHeight}px - ${this.footerHeight}px)`;
    },
    opacity: 0.8,
    radius: 3,
  },
  transition: {
    base: 'all 0.3s',
  },
};
