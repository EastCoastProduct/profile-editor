'use strict';

import React, { PropTypes } from 'react';
import { Link as RRLink } from 'react-router';
import Radium from 'radium';
import Button from '../components/Button';
const Link = new Radium(RRLink);

// Style
import sharedStyle from '../styles/shared/base';
import friendItemStyle from '../styles/components/friendItem';

const FriendItem = ({ data, index, onDelete, onReload }) =>
  <li style={[friendItemStyle.listItem, data.error && friendItemStyle.errItem]}>
    <img
      style={friendItemStyle.image}
      src={data.profileImg.value ||
        'http://igi.icmconsulting.com/static/events/img/blank-user.jpg'}
      alt={data.profileImg.value ? `${data.fullName.value}'s Profile` :
        'Default User Icon'}
    />
    <div
      style={[friendItemStyle.details,
        data.error && friendItemStyle.errDetails]}
    >
      {data.fullName &&
        <h4 style={friendItemStyle.text}>{data.fullName.value}</h4>
      }
      {data.emails.length > 0 &&
        <p style={friendItemStyle.email}>
          {data.emails[0].value &&
            data.emails[0].value.replace('mailto:', '')}
        </p>
      }
      {data.error && <p style={sharedStyle.errMsg}>{data.error}</p>}
      {data.error ?
        <p style={friendItemStyle.text}>{data.webId}</p> :
        <Link
          style={friendItemStyle.link}
          to={{ pathname: '/', query: { webId: data.webId } }}
        >
          {data.webId}
        </Link>
      }
    </div>
    {data.error &&
      <Button
        style={friendItemStyle.reloadIcon}
        onClick={(e) => onReload(e, index)}
        empty
      >
        <i className="fa fa-refresh" />
      </Button>
    }
    <Button
      style={friendItemStyle.trashIcon}
      onClick={(e) => onDelete(e, index)}
      empty
    >
      <i className="fa fa-trash" />
    </Button>
  </li>;

FriendItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReload: PropTypes.func.isRequired,
};

export default new Radium(FriendItem);
