'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { loginFetch } from '../actions/login';
import Radium from 'radium';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

// Styles
import sharedStyle from '../styles/shared/base';
import loginStyles from '../styles/containers/login';

@connect(state => ({
  login: state.login,
}))
@withRouter
@Radium
export default class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    const { dispatch, router } = this.props;
    dispatch(loginFetch(router));
  }

  render() {
    const { login } = this.props;

    return (
      <section style={[sharedStyle.card, loginStyles.base]}>
        <h2 style={loginStyles.heading}>WebId Login</h2>
        <Button
          disabled={login.spinner}
          style={loginStyles.button}
          onClick={this.onLogin}
        >
          <span>With Certificate</span>
          {login.spinner && <Spinner style={loginStyles.spinner} />}
        </Button>
        {!!login.error &&
          <p style={sharedStyle.errMsg}>{login.error}</p>
        }
      </section>
    );
  }
}
