'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Style
import buttonStyle from '../styles/components/button';

const Button = ({ empty, style, ...props }) =>
  <button
    style={[empty ? buttonStyle.emptyBtn : buttonStyle.mainBtn, style]}
    {...props}
  />;

Button.propTypes = {
  empty: PropTypes.bool,
  style: PropTypes.object,
};

export default new Radium(Button);
