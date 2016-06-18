'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Style
import button from '../styles/components/button';

const Button = ({ style, ...props }) =>
  <button style={[button.mainBtn, style]} {...props} />;

Button.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default new Radium(Button);
