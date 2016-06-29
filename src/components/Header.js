'use strict';

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Navigation from './Navigation';

// Styles
import headerStyle from '../styles/components/header';

@Radium
export default class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    view: PropTypes.bool,
    webId: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      menuShow: false,
    };
  }

  showMenu(toggle) {
    this.setState({
      menuShow: toggle,
    });
  }

  render() {
    const { menuShow } = this.state;
    const { title, view, webId } = this.props;

    return (
      <header style={headerStyle.base}>
        <h1 style={headerStyle.menuText} onClick={() => this.showMenu(true)}>
          <i style={headerStyle.menuIcon} className="fa fa-bars" />
          {title}
        </h1>
        {menuShow &&
          <Navigation
            onClick={() => this.showMenu(false)}
            view={view}
            webId={webId}
          />
        }
      </header>
    );
  }
}
