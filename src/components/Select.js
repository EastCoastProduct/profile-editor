'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Style
import sharedStyle from '../styles/shared/base';
import selectStyle from '../styles/components/select';

function renderOptions(list) {
  return list.map((item, key) => {
    return <option value={item.value} key={key}>{item.label}</option>;
  });
}

const Select = ({ label, options, style, ...other }) =>
  <label style={style}>
    <b style={sharedStyle.labelText}>{label}</b>
    <select
      style={selectStyle.base}
      {...other}
    >
      {renderOptions(options)}
    </select>
  </label>;

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  })),
  style: PropTypes.object.isRequired,
};

export default new Radium(Select);
