'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';
import Spinner from './Spinner';
import Button from './Button';

// Styles
import sharedStyle from '../styles/shared/base';
import inputStyle from '../styles/components/input';

const isValid = other =>
  other.touched && other.error && !other.active;

const Input = ({ button, label, spinner, style, ...other }) =>
  <label style={style}>
    <b style={sharedStyle.labelText}>{label}</b>
    <span style={[inputStyle.holder, button && inputStyle.newHolder]}>
      <input
        style={[button ? inputStyle.newInput : inputStyle.input,
          isValid(other) && inputStyle.invalid]}
        {...other}
      />
      {!button && spinner &&
        <span style={inputStyle.spinnerHolder}>
          <Spinner style={inputStyle.spinner} />
        </span>
      }
      {button &&
        <Button
          style={inputStyle.newButton}
          type="submit"
          disabled={isValid(other) || spinner}
        >
          {spinner ?
            <Spinner style={inputStyle.spinner} /> :
            <i style={sharedStyle.icon} className="fa fa-plus"></i>
          }
          {!spinner && button}
        </Button>
      }
    </span>
  </label>;

Input.propTypes = {
  button: PropTypes.string,
  label: PropTypes.string.isRequired,
  spinner: PropTypes.bool,
  style: PropTypes.object.isRequired,
};

export default new Radium(Input);
