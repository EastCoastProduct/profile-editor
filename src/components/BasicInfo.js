'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Styles
import sharedStyle from '../styles/shared/base';
import basicInfoStyle from '../styles/components/basicInfo';

const BasicInfo = ({ edit, onCover, onProfile, user, webId }) =>
  <article
    style={[sharedStyle.card, basicInfoStyle.basicInfo, user.bcgImg.value &&
      { backgroundImage: `url(${user.bcgImg.value})` }]}
  >
    {edit &&
      <form style={basicInfoStyle.coverForm}>
        <label style={basicInfoStyle.coverBtn} key="0">
          Change Cover
          <input
            style={basicInfoStyle.file}
            type="file"
            accept="image/*"
            onChange={onCover}
          />
        </label>
      </form>
    }
    <div style={basicInfoStyle.info}>
      <figure style={basicInfoStyle.figure}>
        {edit &&
          <form style={basicInfoStyle.profileForm}>
            <label style={basicInfoStyle.profileBtn} key="1">
              <i style={basicInfoStyle.cameraIcon} className="fa fa-camera" />
              Change Profile
              <input
                style={basicInfoStyle.file}
                type="file"
                accept="image/*"
                onChange={onProfile}
              />
            </label>
          </form>
        }
        <img
          style={basicInfoStyle.image}
          src={user.profileImg.value ? user.profileImg.value :
            'http://www.adtechnology.co.uk/images/UGM-default-user.png'}
          alt="Placeholder"
        />
      </figure>
      {user.fullName &&
        <h2 style={basicInfoStyle.name}>{user.fullName.value}</h2>
      }
      <a href={webId} target="_blank">
        <i style={basicInfoStyle.linkIcon} className="fa fa-link"></i>
        {webId}
      </a>
    </div>
  </article>;

BasicInfo.propTypes = {
  edit: PropTypes.bool,
  onCover: PropTypes.func,
  onProfile: PropTypes.func,
  user: PropTypes.object.isRequired,
  webId: PropTypes.string.isRequired,
};

export default new Radium(BasicInfo);
