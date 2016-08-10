'use strict';

import React, { PropTypes } from 'react';
import Radium from 'radium';
import Spinner from './Spinner';

// Styles
import sharedStyle from '../styles/shared/base';
import profileCoverStyle from '../styles/components/profileCover';

const ProfileCover = ({ edit, onDelete, onImage, user, webId }) =>
  <article
    style={[sharedStyle.card, profileCoverStyle.basicInfo, user.bcgImg.value &&
      { backgroundImage: `url(${user.bcgImg.value})` }]}
  >
    {edit && user.bcgImg.updating &&
      <div style={profileCoverStyle.coverSpinnerHolder}>
        <Spinner style={profileCoverStyle.coverSpinner} />
      </div>
    }
    {edit && !user.bcgImg.updating &&
      <form style={profileCoverStyle.coverForm}>
        {!!user.bcgImg.value &&
          <span
            style={profileCoverStyle.trashCoverBtn}
            onClick={(e) => onDelete(e, user.bcgImg, 'bcgImg')}
            key="0"
          >
            <i className="fa fa-trash" />
          </span>
        }
        <label style={profileCoverStyle.coverBtn} key="1" htmlFor="cover">
          Change Cover
          <input
            style={profileCoverStyle.file}
            id="cover"
            type="file"
            accept="image/*"
            onChange={(e) => onImage(e, user.bcgImg, 'bcgImg')}
          />
        </label>
      </form>
    }
    <div style={profileCoverStyle.info}>
      <figure style={profileCoverStyle.figure}>
        {edit && user.profileImg.updating &&
          <div style={profileCoverStyle.profileSpinnerHolder}>
            <Spinner />
          </div>
        }
        {edit && !user.profileImg.updating &&
          <form style={profileCoverStyle.profileForm}>
            <label
              style={profileCoverStyle.profileBtn}
              key="2"
              htmlFor="profile"
            >
              <i
                style={profileCoverStyle.cameraIcon}
                className="fa fa-camera"
              />
              Change Profile
              <input
                style={profileCoverStyle.file}
                id="profile"
                type="file"
                accept="image/*"
                onChange={(e) => onImage(e, user.profileImg, 'profileImg')}
              />
            </label>
            {!!user.profileImg.value &&
              <span
                style={profileCoverStyle.trashProfileBtn}
                onClick={(e) => onDelete(e, user.profileImg, 'profileImg')}
                key="3"
              >
                <i className="fa fa-trash" />
              </span>
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
      <a
        style={profileCoverStyle.linkAnchor}
        href={webId}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i style={profileCoverStyle.linkIcon} className="fa fa-link" />
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
