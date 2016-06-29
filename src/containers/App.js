'use strict';

import React, { PropTypes } from 'react';
import _ from 'lodash';
import Radium, { Style } from 'radium';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Styles
import normalize from '../styles/base/normalize';
import defaults from '../styles/base/defaults';
import sharedStyle from '../styles/shared/base';
const globalStyles = _.merge(normalize, defaults);

const App = (props) =>
  <div>
    <Style rules={globalStyles} />
    <Header
      title={props.children.props.route.title}
      view={props.children.props.route.view}
      webId={props.location.query.webId}
    />
    <main style={sharedStyle.content}>{props.children}</main>
    <Footer />
  </div>;

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object.isRequired,
};

export default new Radium(App);
