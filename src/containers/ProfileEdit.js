'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate } from '../actions/profile';
import Radium from 'radium';
import BasicInfo from '../components/BasicInfo';

// Style
import sharedStyle from '../styles/shared/base';
import profileEditStyle from '../styles/containers/profileEdit';

@connect(state => ({
  profile: state.profile,
}))
@Radium
export default class ProfileEdit extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.uploadCover = this.uploadCover.bind(this);
    this.uploadProfile = this.uploadProfile.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    const { profile } = this.props;

    if (profile.user.empty) this.getProfile();
  }

  getProfile() {
    const { dispatch, location } = this.props;

    dispatch(profileFetch(location.query.webId));
  }

  uploadCover(e) {
    e.preventDefault();
  }

  uploadProfile(e) {
    e.preventDefault();
  }

  updateData(e, item) {
    const { dispatch } = this.props;
    const newValue = e.target.value;
    if (newValue === item.value) return;

    dispatch(profileUpdate(newValue, item));
  }

  render() {
    const { location, profile } = this.props;
    const { user } = profile;

    return (
      !user.empty &&
        <section>
          <BasicInfo
            webId={location.query.webId}
            user={profile.user}
            onCover={this.uploadCover}
            onProfile={this.uploadProfile}
            edit
          />
          <article style={[sharedStyle.card, profileEditStyle.leftCard]}>
            <h3 style={sharedStyle.heading}>
              <i style={sharedStyle.icon} className="fa fa-user"></i>
              Basic Information
            </h3>
            <form>
              <input
                style={profileEditStyle.firstName}
                type="text"
                placeholder="First Name"
                defaultValue={user.firstName.value}
                onBlur={(e) => this.updateData(e, user.firstName)}
              />
              <input
                style={profileEditStyle.lastName}
                type="text"
                placeholder="Last Name"
                defaultValue={user.lastName.value}
              />
              <input
                style={profileEditStyle.nickName}
                type="text"
                placeholder="Nickname"
                defaultValue={user.nickName.value}
              />
              <input
                style={profileEditStyle.fullName}
                type="text"
                placeholder="Full Name"
                defaultValue={user.fullName.value}
              />
            </form>
          </article>
        </section>
    );
  }
}
