'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { profileFetch } from '../actions/profile';
import Radium from 'radium';
import BasicInfo from '../components/BasicInfo';

// Style
import sharedStyle from '../styles/shared/base';
import profileStyle from '../styles/containers/profile';

@withRouter
@connect(state => ({
  profile: state.profile,
}))
@Radium
export default class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile() {
    const { dispatch, location, router } = this.props;

    if (!location.query.webId) return router.push('/login');
    return dispatch(profileFetch(location.query.webId));
  }

  render() {
    const { location, profile } = this.props;
    const { user } = profile;

    return (
      !user.empty &&
        <section>
          <BasicInfo webId={location.query.webId} user={profile.user} />
          {(user.fullName.value || user.firstName.value || user.lastName.value
            || user.nickName.value || user.gender.value) &&
            <article style={[sharedStyle.card, profileStyle.halfCardLeft]}>
              <h3 style={sharedStyle.heading}>
                <i style={sharedStyle.icon} className="fa fa-user"></i>
                Basic Information
              </h3>
              <dl>
                {user.fullName.value && <dt>Full Name</dt>}
                {user.fullName.value && <dd>{user.fullName.value}</dd>}
                {user.firstName.value && <dt>First Name</dt>}
                {user.firstName.value && <dd>{user.firstName.value}</dd>}
                {user.lastName.value && <dt>Last Name</dt>}
                {user.lastName.value && <dd>{user.lastName.value}</dd>}
                {user.nickName.value && <dt>Nickname</dt>}
                {user.nickName.value && <dd>{user.nickName.value}</dd>}
                {user.gender.value && <dt>Gender</dt>}
                {user.gender.value && <dd>{user.gender.value}</dd>}
              </dl>
            </article>
          }
          <div style={sharedStyle.clearfix}></div>
        </section>
    );
  }
}
