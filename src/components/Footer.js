'use strict';

import React from 'react';
import Radium from 'radium';

// Style
import footerStyle from '../styles/components/footer';

const getYear = () => (new Date).getFullYear();

const Footer = () =>
  <footer style={footerStyle.base}>
    <p style={footerStyle.text}>
      <small style={footerStyle.copyright}>&copy;</small>{getYear()}
      <a
        style={footerStyle.tracker}
        target="_blank"
        href="https://github.com/EastCoastProduct/profile-editor"
      >Issue Tracker</a>
      <a
        style={footerStyle.github}
        target="_blank"
        href="https://github.com/EastCoastProduct/profile-editor/issues"
      >GitHub</a>
    </p>
  </footer>;

export default new Radium(Footer);
