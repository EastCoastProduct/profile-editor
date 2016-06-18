'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loginFetch } from '../actions/login';
import Radium from 'radium';
import Button from '../components/Button';

// Styles
import sharedStyle from '../styles/shared/base';
import loginStyles from '../styles/containers/login';

@connect(state => ({
  login: state.login,
}))
@Radium
export default class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { dispatch, login } = this.props;
    dispatch(loginFetch(login.webId));
  }

  render() {
    const { login } = this.props;

    return (
      <section style={[sharedStyle.card, loginStyles.base]}>
        <h2 style={loginStyles.heading}>WebId Login</h2>
        <Button
          style={loginStyles.button}
          onClick={this.onLogin}
        >With Certificate</Button>
        {!!login.error &&
          <p style={sharedStyle.errMsg}>{login.error}</p>
        }
      </section>
    );
  }
}
