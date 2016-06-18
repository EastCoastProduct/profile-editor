'use strict';

import React, { PropTypes } from 'react';
import { Link as RRLink } from 'react-router';
import Radium from 'radium';
const Link = new Radium(RRLink);

// Style
import navStyle from '../styles/components/navigation';

const Navigation = ({ edit, onClick }) =>
  <div style={navStyle.overlay} onClick={onClick}>
    <nav style={navStyle.navigation}>
      <ul>
        <li>
          <Link
            style={navStyle.navItem}
            to={edit ? '/' : '/edit'}
            key="0"
            activeStyle={navStyle.navActive}
          >
            <i style={navStyle.navIcon} className="fa fa-user"></i>
            {edit ? 'View Profile' : 'Edit profile'}
          </Link>
        </li>
        <li>
          <a style={navStyle.navItem} href="#" key="1">
            <i style={navStyle.navIcon} className="fa fa-users"></i>
            People you know
          </a>
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
            Login
          </Link>
        </li>
      </ul>
    </nav>
  </div>;

Navigation.propTypes = {
  edit: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default new Radium(Navigation);
