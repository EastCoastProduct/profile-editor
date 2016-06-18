'use strict';

import React, { Component } from 'react';
import Radium from 'radium';

// Styles
import footerStyle from '../styles/components/footer';

@Radium
export default class Footer extends Component {
  getYear() {
    const now = new Date();
    return now.getFullYear();
  }

  render() {
    return (
      <footer style={footerStyle.base}>
        <p style={footerStyle.text}>
          <small style={footerStyle.copyright}>&copy;</small>{this.getYear()}
          <a style={footerStyle.tracker} href="#">Issue Tracker</a>
          <a style={footerStyle.github} href="#">GitHub</a>
        </p>
      </footer>
    );
  }
}
