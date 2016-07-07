'use strict';

import React, { PropTypes } from 'react';
import { withRouter, Link as RRLink } from 'react-router';
import Radium from 'radium';
import Input from './Input';
const Link = new Radium(RRLink);

// Styles
import sharedStyle from '../styles/shared/base';
import webIdStyle from '../styles/components/webId';

const changeRoute = (e, goTo, router) => {
  e.preventDefault();
  const webId = e.target.elements.webid.value;
  router.push(`${goTo}?webId=${encodeURIComponent(webId)}`);
};

const WebId = ({ error, goTo, router }) =>
  <section style={sharedStyle.leftCard}>
    <h3 style={sharedStyle.heading}>
      <i style={sharedStyle.icon} className="fa fa-info"></i>
      WebID
    </h3>
    <p style={[sharedStyle.infoMsg, webIdStyle.info]}>
      Type in WebID to see a profile of that person or
      <Link style={webIdStyle.link} to="login"> Login </Link>
      to see your profile.
    </p>
    <form onSubmit={(e) => changeRoute(e, goTo, router)}>
      <Input
        button="View Profile"
        label="WebID"
        name="webid"
        placeholder="Type in valid WebId"
        type="url"
      />
    </form>
    {error && <p style={sharedStyle.errMsg}>{error}</p>}
  </section>;

WebId.propTypes = {
  error: PropTypes.string,
  goTo: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
};

export default withRouter(new Radium(WebId));
