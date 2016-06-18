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

const App = ({ children }) =>
  <div>
    <Style rules={globalStyles} />
    <Header
      title={children.props.route.title}
      edit={children.props.route.edit}
    />
    <main style={sharedStyle.content}>{children}</main>
    <Footer />
  </div>;

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default new Radium(App);
