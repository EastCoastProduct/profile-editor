'use strict';

import React, { PropTypes } from 'react';
import { withRouter, Link as RRLink } from 'react-router';
import { reduxForm, propTypes } from 'redux-form';
import Radium from 'radium';
import Input from './Input';
const Link = new Radium(RRLink);

// Styles
import sharedStyle from '../styles/shared/base';
import webIdStyle from '../styles/components/webId';

// Validation
import { isRequired, isWebId } from '../utils/validator';
const fields = ['webId'];
const validate = values => {
  const errors = {};

  errors.webId = isRequired(values.webId) || isWebId(values.webId);
  return errors;
};

const changeRoute = (goTo, router, webId) => {
  router.push(`${goTo}?webId=${encodeURIComponent(webId)}`);
};

const WebId = ({ error, goTo, router, fields: { webId }, handleSubmit }) =>
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
    <form onSubmit={handleSubmit(() => changeRoute(goTo, router, webId.value))}>
      <Input
        button="View Profile"
        label="WebID"
        placeholder="Type in valid WebId"
        type="url"
        {...webId}
      />
      {webId.touched && webId.error && !webId.active &&
        <p style={sharedStyle.errMsg}>{webId.error}</p>
      }
    </form>
    {error && <p style={sharedStyle.errMsg}>{error}</p>}
  </section>;

WebId.propTypes = {
  ...propTypes,
  error: PropTypes.string,
  goTo: PropTypes.string.isRequired,
  router: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'WebIdForm',
  fields,
  validate,
})(withRouter(new Radium(WebId)));
