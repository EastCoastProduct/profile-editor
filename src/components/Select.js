'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';
import Spinner from './Spinner';

// Styles
import sharedStyle from '../styles/shared/base';
import selectStyle from '../styles/components/select';

const renderOptions = (list) =>
  list.map((item, key) => {
    return <option value={item.value} key={key}>{item.label}</option>;
  });

const Select = ({ label, options, spinner, style, ...other }) =>
  <label style={style}>
    <b style={sharedStyle.labelText}>{label}</b>
    <span style={selectStyle.holder}>
      <select
        style={selectStyle.base}
        {...other}
      >
        {renderOptions(options)}
      </select>
      {spinner &&
        <span style={selectStyle.spinnerHolder}>
          <Spinner style={selectStyle.spinner} />
        </span>
      }
    </span>
  </label>;

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  })),
  spinner: PropTypes.bool,
  style: PropTypes.object.isRequired,
};

export default new Radium(Select);
