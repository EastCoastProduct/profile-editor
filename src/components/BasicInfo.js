'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Styles
import sharedStyle from '../styles/shared/base';
import basicInfoStyle from '../styles/components/basicInfo';

const BasicInfo = ({ edit, onDelete, onImage, user, webId }) =>
  <article
    style={[sharedStyle.card, basicInfoStyle.basicInfo, user.bcgImg.value &&
      { backgroundImage: `url(${user.bcgImg.value})` }]}
  >
    {edit &&
      <form style={basicInfoStyle.coverForm}>
        {!!user.bcgImg.value &&
          <label
            style={basicInfoStyle.trashCoverBtn}
            onClick={(e) => onDelete(e, user.bcgImg, 'bcgImg')}
            key="0"
          >
            <i className="fa fa-trash"></i>
          </label>
        }
        <label style={basicInfoStyle.coverBtn} key="1">
          Change Cover
          <input
            style={basicInfoStyle.file}
            type="file"
            accept="image/*"
            onChange={(e) => onImage(e, user.bcgImg, 'bcgImg')}
          />
        </label>
      </form>
    }
    <div style={basicInfoStyle.info}>
      <figure style={basicInfoStyle.figure}>
        {edit &&
          <form style={basicInfoStyle.profileForm}>
            <label style={basicInfoStyle.profileBtn} key="2">
              <i style={basicInfoStyle.cameraIcon} className="fa fa-camera" />
              Change Profile
              <input
                style={basicInfoStyle.file}
                type="file"
                accept="image/*"
                onChange={(e) => onImage(e, user.profileImg, 'profileImg')}
              />
            </label>
            {!!user.profileImg.value &&
              <label
                style={basicInfoStyle.trashProfileBtn}
                onClick={(e) => onDelete(e, user.profileImg, 'profileImg')}
                key="3"
              >
                <i className="fa fa-trash"></i>
              </label>
            }
          </form>
        }
        <img
          style={basicInfoStyle.image}
          src={user.profileImg.value ? user.profileImg.value :
            'http://igi.icmconsulting.com/static/events/img/blank-user.jpg'}
          alt={`${user.fullName.value}'s Profile`}
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
  onDelete: PropTypes.func,
  onImage: PropTypes.func,
  user: PropTypes.object.isRequired,
  webId: PropTypes.string.isRequired,
};

export default new Radium(BasicInfo);
