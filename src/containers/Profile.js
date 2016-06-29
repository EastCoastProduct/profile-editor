'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch } from '../actions/profile';
import Radium from 'radium';
import ProfileCover from '../components/ProfileCover';
import BasicInfo from '../components/BasicInfo';
import ShowInfo from '../components/ShowInfo';
import WebId from '../components/WebId';

// Style
import sharedStyle from '../styles/shared/base';
import profileStyle from '../styles/containers/profile';

@connect(state => ({
  profile: state.profile,
}))
@Radium
export default class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.getProfile();
  }

  componentWillUpdate(nextProps) {
    this.getProfile(nextProps);
  }

  getProfile(nextProps) {
    const { dispatch, location, profile } = nextProps || this.props;

    if (location.query.webId && profile.user.webId !== location.query.webId) {
      dispatch(profileFetch(location.query.webId));
    }
  }

  render() {
    const { location, profile } = this.props;
    const { user } = profile;

    return (
      location.query.webId ?
        user.webId === location.query.webId &&
          <section>
            <ProfileCover webId={location.query.webId} user={user} />
            <div style={profileStyle.halfLeft}>
              {(user.fullName.value || user.firstName.value ||
                user.lastName.value || user.nickName.value ||
                user.gender.value) &&
                <BasicInfo user={user} />
              }
              {user.phones.length > 0 &&
                <ShowInfo
                  icon="phone"
                  list={user.phones}
                  prefix="tel:"
                  title="Phones"
                />
              }
              {user.emails.length > 0 &&
                <ShowInfo
                  icon="envelope"
                  list={user.emails}
                  prefix="mailto:"
                  title="Emails"
                />
              }
            </div>
            <div style={profileStyle.halfRight}>
              {user.blogs.length > 0 &&
                <ShowInfo icon="rss" list={user.blogs} title="Blogs" />
              }
              {user.homepages.length > 0 &&
                <ShowInfo
                  icon="globe"
                  list={user.homepages}
                  title="Homepages"
                />
              }
              {user.workpages.length > 0 &&
                <ShowInfo
                  icon="globe"
                  list={user.workpages}
                  title="Workpages"
                />
              }
            </div>
            <div style={sharedStyle.clearfix}></div>
          </section> :
        <WebId goTo="/" />
    );
  }
}
