'use strict';

import React, { PropTypes } from 'react';
import { Link as RRLink } from 'react-router';
import Radium from 'radium';
import Button from '../components/Button';
const Link = new Radium(RRLink);

// Style
import friendItemStyle from '../styles/components/friendItem';

const FriendItem = ({ data, index, onDelete, url }) =>
  <li style={friendItemStyle.listItem}>
    <img
      style={friendItemStyle.image}
      src={(data.profileImg.value) ||
        'http://igi.icmconsulting.com/static/events/img/blank-user.jpg'}
      alt={`${data.fullName.value}'s Profile`}
    />
    <div style={friendItemStyle.details}>
      {data.fullName &&
        <h4 style={friendItemStyle.name}>{data.fullName.value}</h4>
      }
      {data.emails.length > 0 &&
        <p style={friendItemStyle.email}>
          {data.emails[0].value &&
            data.emails[0].value.replace('mailto:', '')}
        </p>
      }
      <Link
        style={friendItemStyle.link}
        to={`/?webId=${encodeURIComponent(url)}`}
      >
        {url}
      </Link>
    </div>
    <Button
      style={friendItemStyle.trashIcon}
      onClick={(e) => onDelete(e, index)}
      empty
    >
      <i className="fa fa-trash"></i>
    </Button>
  </li>;

FriendItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default new Radium(FriendItem);
