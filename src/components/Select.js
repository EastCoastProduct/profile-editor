'use strict';

import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import Spinner from './Spinner';
import uniqueId from '../utils/uniqueId';

// Styles
import sharedStyle from '../styles/shared/base';
import selectStyle from '../styles/components/select';

@Radium
export default class Select extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string,
    })),
    spinner: PropTypes.bool,
    style: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.forId = uniqueId();
  }

  renderOptions(list) {
    return list.map((item, key) => {
      return <option value={item.value} key={key}>{item.label}</option>;
    });
  }

  render() {
    const { label, options, spinner, style, ...other } = this.props;

    return (
      <label style={style} htmlFor={this.forId}>
        <b style={sharedStyle.labelText}>{label}</b>
        <span style={selectStyle.holder}>
          <select
            style={selectStyle.base}
            id={this.forId}
            {...other}
          >
            {this.renderOptions(options)}
          </select>
          {spinner &&
            <span style={selectStyle.spinnerHolder}>
              <Spinner style={selectStyle.spinner} />
            </span>
          }
        </span>
      </label>
    );
  }
}
