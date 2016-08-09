'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch } from '../actions/profile';
import Radium from 'radium';
import ProfileCover from '../components/ProfileCover';
import BasicInfo from '../components/BasicInfo';
import ShowInfo from '../components/ShowInfo';
import Spinner from '../components/Spinner';
import WebId from '../components/WebId';

// Style
import sharedStyle from '../styles/shared/base';
import profileStyle from '../styles/containers/profile';

class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    this.getProfile(nextProps);
  }

  getProfile(nextProps) {
    const { dispatch, location: { query: { webId } },
      profile: { user, errors } } = nextProps || this.props;

    if (webId && webId !== user.webId && !errors.get) {
      dispatch(profileFetch(webId));
    }
  }

  render() {
    const { location, profile: { user, errors } } = this.props;

    return (
      location.query.webId && !errors.get ?
        <section>
          {user.webId === location.query.webId ?
            <div>
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
            </div> :
            <article style={sharedStyle.card}>
              <Spinner />
            </article>
          }
        </section> :
        <WebId formKey="webIdProfile" errorMsg={errors.get} goTo="/" />
    );
  }
}

export default {
  ProfileTest: Profile,
  Profile: connect(state => ({
    profile: state.profile,
  }))(new Radium(Profile)),
};

