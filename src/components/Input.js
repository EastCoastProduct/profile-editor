'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button';

// Style
import sharedStyle from '../styles/shared/base';
import inputStyle from '../styles/components/input';

const Input = ({ button, label, style, ...other }) =>
  <label style={style}>
    <b style={sharedStyle.labelText}>{label}</b>
    <input
      style={button ? inputStyle.newInput : inputStyle.input}
      {...other}
    />
    {button &&
      <Button type="submit" style={inputStyle.newButton}>
        <i style={sharedStyle.icon} className="fa fa-plus"></i>
        {button}
      </Button>
    }
  </label>;

Input.propTypes = {
  button: PropTypes.string,
  label: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};

export default new Radium(Input);
