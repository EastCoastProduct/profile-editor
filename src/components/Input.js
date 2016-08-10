'use strict';

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Spinner from './Spinner';
import Button from './Button';
import uniqueId from '../utils/uniqueId';

// Styles
import sharedStyle from '../styles/shared/base';
import inputStyle from '../styles/components/input';

@Radium
export default class Input extends Component {
  static propTypes = {
    button: PropTypes.string,
    label: PropTypes.string.isRequired,
    spinner: PropTypes.bool,
    style: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.forId = uniqueId();
  }

  isValid(other) {
    return other.touched && other.error && !other.active;
  }

  render() {
    const { button, label, spinner, style, ...other } = this.props;

    return (
      <label style={style} htmlFor={this.forId}>
        <b style={sharedStyle.labelText}>{label}</b>
        <span style={[inputStyle.holder, button && inputStyle.newHolder]}>
          <input
            style={[button ? inputStyle.newInput : inputStyle.input,
              this.isValid(other) && inputStyle.invalid]}
            id={this.forId}
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
              disabled={this.isValid(other) || spinner}
            >
              {spinner ?
                <Spinner style={inputStyle.spinner} /> :
                <i style={sharedStyle.icon} className="fa fa-plus" />
              }
              {!spinner && button}
            </Button>
          }
        </span>
      </label>
    );
  }
}
