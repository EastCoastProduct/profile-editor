'use strict';

import React from 'react';
import { Link as RRLink, IndexLink as RRIndexLink } from 'react-router';
import Radium from 'radium';

// Style
import sharedStyle from '../styles/shared/base';
import page404Style from '../styles/components/page404';

const Link = new Radium(RRLink);
const IndexLink = new Radium(RRIndexLink);

const Page404 = () =>
  <article style={sharedStyle.card}>
    <p style={page404Style.text}>
      There is no page you are looking for, nothing here to see!
    </p>
    <p style={page404Style.text}>Please go back to </p>
    <IndexLink style={page404Style.link} to="/">Home Page</IndexLink>
    <p style={page404Style.text}>or</p>
    <Link style={page404Style.link} to="/login">Login</Link>
  </article>;

export default new Radium(Page404);
