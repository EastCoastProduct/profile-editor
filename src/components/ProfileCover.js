'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';

// Styles
import sharedStyle from '../styles/shared/base';
import profileCoverStyle from '../styles/components/profileCover';

const ProfileCover = ({ edit, onDelete, onImage, user, webId }) =>
  <article
    style={[sharedStyle.card, profileCoverStyle.basicInfo, user.bcgImg.value &&
      { backgroundImage: `url(${user.bcgImg.value})` }]}
  >
    {edit &&
      <form style={profileCoverStyle.coverForm}>
        {!!user.bcgImg.value &&
          <label
            style={profileCoverStyle.trashCoverBtn}
            onClick={(e) => onDelete(e, user.bcgImg, 'bcgImg')}
            key="0"
          >
            <i className="fa fa-trash"></i>
          </label>
        }
        <label style={profileCoverStyle.coverBtn} key="1">
          Change Cover
          <input
            style={profileCoverStyle.file}
            type="file"
            accept="image/*"
            onChange={(e) => onImage(e, user.bcgImg, 'bcgImg')}
          />
        </label>
      </form>
    }
    <div style={profileCoverStyle.info}>
      <figure style={profileCoverStyle.figure}>
        {edit &&
          <form style={profileCoverStyle.profileForm}>
            <label style={profileCoverStyle.profileBtn} key="2">
              <i
                style={profileCoverStyle.cameraIcon}
                className="fa fa-camera"
              />
              Change Profile
              <input
                style={profileCoverStyle.file}
                type="file"
                accept="image/*"
                onChange={(e) => onImage(e, user.profileImg, 'profileImg')}
              />
            </label>
            {!!user.profileImg.value &&
              <label
                style={profileCoverStyle.trashProfileBtn}
                onClick={(e) => onDelete(e, user.profileImg, 'profileImg')}
                key="3"
              >
                <i className="fa fa-trash"></i>
              </label>
            }
          </form>
        }
        <img
          style={profileCoverStyle.image}
          src={user.profileImg.value ? user.profileImg.value :
            'http://igi.icmconsulting.com/static/events/img/blank-user.jpg'}
          alt={`${user.fullName.value}'s Profile`}
        />
      </figure>
      {user.fullName &&
        <h2 style={profileCoverStyle.name}>{user.fullName.value}</h2>
      }
      <a href={webId} target="_blank">
        <i style={profileCoverStyle.linkIcon} className="fa fa-link"></i>
        {webId}
      </a>
    </div>
  </article>;

ProfileCover.propTypes = {
  edit: PropTypes.bool,
  onDelete: PropTypes.func,
  onImage: PropTypes.func,
  user: PropTypes.object.isRequired,
  webId: PropTypes.string.isRequired,
};

export default new Radium(ProfileCover);
