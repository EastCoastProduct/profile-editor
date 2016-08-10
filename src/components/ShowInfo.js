'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Styles
import sharedStyle from '../styles/shared/base';
import showInfoStyle from '../styles/components/showInfo';

const renderList = (list, prefix) =>
  list.map((item, key) => {
    return (
      <li key={key}>
        <a
          style={showInfoStyle.link}
          href={item.value}
          target={!prefix ? '_blank' : '_self'}
        >
          {!prefix &&
            <i
              style={showInfoStyle.linkIcon}
              className="fa fa-link"
            />
          }
          {item.value && item.value.replace(prefix, '')}
        </a>
      </li>
    );
  });

const ShowInfo = ({ icon, list, prefix, title }) =>
  <article style={sharedStyle.leftCard}>
    <h3 style={sharedStyle.heading}>
      <i style={sharedStyle.icon} className={`fa fa-${icon}`} />
      {title}
    </h3>
    <ul>
      {renderList(list, prefix)}
    </ul>
  </article>;

ShowInfo.propTypes = {
  icon: PropTypes.string.isRequired,
  list: PropTypes.array.isRequired,
  prefix: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default new Radium(ShowInfo);
