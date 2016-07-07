'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Style
import spinnerStyle from '../styles/components/spinner';

const Spinner = ({ style }) =>
  <i style={[spinnerStyle.base, style]} className="fa fa-spinner" />;

Spinner.propTypes = {
  style: PropTypes.object,
};

export default new Radium(Spinner);
