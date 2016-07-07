'use strict';

import React, { PropTypes } from 'react';
import { Link as RRLink } from 'react-router';
import Radium from 'radium';
const Link = new Radium(RRLink);

// Style
import navStyle from '../styles/components/navigation';

const viewOrEditUrl = (view, webId) => {
  if (webId) {
    return view ? `/edit?webId=${encodeURIComponent(webId)}` :
      `/?webId=${encodeURIComponent(webId)}`;
  }
  return view ? '/edit' : '/';
};

const Navigation = ({ onClick, view, webId }) =>
  <div style={navStyle.overlay} onClick={onClick}>
    <nav style={navStyle.navigation}>
      <ul>
        <li>
          <Link
            style={navStyle.navItem}
            to={viewOrEditUrl(view, webId)}
            key="0"
            activeStyle={navStyle.navActive}
          >
            <i style={navStyle.navIcon} className="fa fa-user"></i>
            <span style={navStyle.navText}>
              {view ? 'Edit profile' : 'View Profile'}
            </span>
          </Link>
        </li>
        <li>
          <Link
            style={navStyle.navItem}
            to={webId ? `/friends?webId=${encodeURIComponent(webId)}` :
              '/friends'}
            key="1"
            activeStyle={navStyle.navActive}
          >
            <i style={navStyle.navIcon} className="fa fa-users"></i>
            <span style={navStyle.navText}>
              People you know
            </span>
          </Link>
        </li>
        <li>
          <Link
            style={navStyle.navItem}
            to="/login"
            key="2"
            activeStyle={navStyle.navActive}
          >
            <i style={navStyle.navIcon} className="fa fa-sign-in">
            </i>
            <span style={navStyle.navText}>
              Login
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  </div>;

Navigation.propTypes = {
  onClick: PropTypes.func.isRequired,
  view: PropTypes.bool,
  webId: PropTypes.string,
};

export default new Radium(Navigation);
