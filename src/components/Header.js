'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';
import Navigation from './Navigation';

// Style
import headerStyle from '../styles/components/header';

const Header = props => {
  const { onToggleMenu, showMenu, title, view, webId } = props;

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
          onClick={() => onToggleMenu(false)}
          view={view}
          webId={webId}
        />
      }
    </header>
  );
};

Header.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
  showMenu: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  view: PropTypes.bool,
  webId: PropTypes.string,
};

export default new Radium(Header);

