'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';
import Navigation from './Navigation';

// Style
import headerStyle from '../styles/components/header';

const Header = props => {
  const { loginWebId, onLogout, onToggleMenu, showMenu, title, webId } =
    props;

  return (
    <header style={headerStyle.base}>
      <h1
        style={headerStyle.menuText}
        onClick={() => onToggleMenu(true)}
      >
        <i style={headerStyle.menuIcon} className="fa fa-bars" />
        {title}
      </h1>
      {showMenu &&
        <Navigation
          loginWebId={loginWebId}
          onClick={() => onToggleMenu(false)}
          onLogout={onLogout}
          webId={webId}
        />
      }
    </header>
  );
};

Header.propTypes = {
  loginWebId: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  onToggleMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  webId: PropTypes.string,
};

export default new Radium(Header);

