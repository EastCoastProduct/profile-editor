'use strict';

import React, { PropTypes } from 'react';
import { Link as RRLink, IndexLink as RRIndexLink } from 'react-router';
import Radium from 'radium';

// Style
import navStyle from '../styles/components/navigation';

const IndexLink = new Radium(RRIndexLink);
const Link = new Radium(RRLink);

const logout = (e, onLogout) => {
  e.preventDefault();
  onLogout();
};

const Navigation = ({ loginWebId, onClick, onLogout, webId }) =>
  <div style={navStyle.overlay} onClick={onClick}>
    <nav style={navStyle.navigation}>
      <ul>
        <li>
          <IndexLink
            style={navStyle.navItem}
            to={{ pathname: '/', query: { webId } }}
            key="1"
            activeStyle={navStyle.navActive}
          >
            <i style={navStyle.navIcon} className="fa fa-user" />
            <span style={navStyle.navText}>
              View Profile
            </span>
          </IndexLink>
        </li>
        <li>
          <Link
            style={navStyle.navItem}
            to={{ pathname: '/edit', query: { webId } }}
            key="0"
            activeStyle={navStyle.navActive}
          >
            <i style={navStyle.navIcon} className="fa fa-user" />
            <span style={navStyle.navText}>
              Edit profile
            </span>
          </Link>
        </li>
        <li>
          <Link
            style={navStyle.navItem}
            to={{ pathname: '/friends', query: { webId } }}
            key="2"
            activeStyle={navStyle.navActive}
          >
            <i style={navStyle.navIcon} className="fa fa-users" />
            <span style={navStyle.navText}>
              People you know
            </span>
          </Link>
        </li>
        <li>
          <Link
            style={navStyle.navItem}
            to="/setWebId"
            key="3"
            activeStyle={navStyle.navActive}
          >
            <i style={navStyle.navIcon} className="fa fa-link" />
            <span style={navStyle.navText}>
              Set WebId
            </span>
          </Link>
        </li>
        {loginWebId ?
          <li>
            <a
              style={navStyle.navItem}
              key="4"
              onClick={(e) => logout(e, onLogout)}
              href
            >
              <i style={navStyle.navIcon} className="fa fa-sign-out" />
              <span style={navStyle.navText}>
                Logout
              </span>
            </a>
          </li> :
          <li>
            <Link
              style={navStyle.navItem}
              to="/login"
              key="5"
              activeStyle={navStyle.navActive}
            >
              <i style={navStyle.navIcon} className="fa fa-sign-in" />
              <span style={navStyle.navText}>
                Login
              </span>
            </Link>
          </li>
        }
      </ul>
    </nav>
  </div>;

Navigation.propTypes = {
  loginWebId: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  webId: PropTypes.string,
};

export default new Radium(Navigation);
