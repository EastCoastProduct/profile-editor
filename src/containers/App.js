'use strict';

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { menuToggle } from '../actions/app';
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
}))
@Radium
export default class App extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    children: PropTypes.element.isRequired,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { location: oldLocation } = this.props;
    const { dispatch, location } = nextProps;

    if (location.query.webId !== oldLocation.query.webId) {
      dispatch(profileReset());
    }
  }

  onToggleMenu(toggle) {
    const { dispatch } = this.props;

    dispatch(menuToggle(toggle));
  }

  render() {
    const { app, children, location } = this.props;

    return (
      <StyleRoot>
        <Style rules={globalStyles} />
        <Header
          onToggleMenu={this.onToggleMenu}
          showMenu={app.showMenu}
          title={children.props.route.title}
          view={children.props.route.view}
          webId={location.query.webId}
        />
        <main style={sharedStyle.content}>{children}</main>
        <Footer />
      </StyleRoot>
    );
  }
}
