'use strict';

import React from 'react';
import Radium from 'radium';

// Styles
import footerStyle from '../styles/components/footer';

function getYear() {
  const now = new Date();
  return now.getFullYear();
}

const Footer = () =>
  <footer style={footerStyle.base}>
    <p style={footerStyle.text}>
      <small style={footerStyle.copyright}>&copy;</small>{getYear()}
      <a style={footerStyle.tracker} href="#">Issue Tracker</a>
      <a style={footerStyle.github} href="#">GitHub</a>
    </p>
  </footer>;

export default new Radium(Footer);
