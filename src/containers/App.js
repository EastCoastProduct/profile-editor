'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { menuToggle } from '../actions/app';
import { logout } from '../actions/login';
import { profileReset } from '../actions/profile';
import _ from 'lodash';
import Radium, { Style, StyleRoot } from 'radium';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Styles
import normalize from '../styles/base/normalize';
import defaults from '../styles/base/defaults';
import sharedStyle from '../styles/shared/base';
const globalStyles = _.merge(normalize, defaults);

@connect(state => ({
  app: state.app,
  login: state.login,
}))
@withRouter
@Radium
export default class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onToggleMenu = this.onToggleMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    this.isLoggedIn();
  }

  componentWillReceiveProps(nextProps) {
    const { location: oldLocation } = this.props;
    const { dispatch, location, router } = nextProps;

    this.isLoggedIn(nextProps);
    if (location.query.webId !== oldLocation.query.webId) {
      dispatch(profileReset(router));
    }
  }

  onToggleMenu(toggle) {
    const { dispatch } = this.props;

    dispatch(menuToggle(toggle));
  }

  isLoggedIn(nextProps) {
    const { location, login, router } = nextProps || this.props;

    if (login.webId && !location.query.webId) {
      router.replace({ pathname: location.pathname, query: { webId:
        login.webId } });
    }
  }

  logout() {
    const { dispatch, router } = this.props;

    dispatch(logout(router));
  }

  render() {
    const { app, children, location, login } = this.props;

    return (
      <div>
        <StyleRoot>
          <Style rules={globalStyles} />
          <Header
            onLogout={this.logout}
            onToggleMenu={this.onToggleMenu}
            showMenu={app.showMenu}
            title={children.props.route.title}
            view={children.props.route.view}
            webId={location.query.webId}
            loginWebId={login.webId}
          />
          <main style={sharedStyle.content}>{children}</main>
          <Footer />
        </StyleRoot>
      </div>
    );
  }
}
