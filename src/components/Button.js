'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Style
import buttonStyle from '../styles/components/button';

const btnStyle = (disabled, empty, style) => {
  let btn;
  if (empty) {
    btn = disabled ? buttonStyle.emptyBtnDisabled : buttonStyle.emptyBtn;
  } else {
    btn = disabled ? buttonStyle.mainBtnDisabled : buttonStyle.mainBtn;
  }
  return [btn, style];
};

const Button = ({ empty, style, ...props }) =>
  <button
    style={btnStyle(props.disabled, empty, style)}
    {...props}
  />;

Button.propTypes = {
  disabled: PropTypes.bool,
  empty: PropTypes.bool,
  style: PropTypes.object,
};

export default new Radium(Button);
