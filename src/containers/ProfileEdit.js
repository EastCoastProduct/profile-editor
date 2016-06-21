'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate, profileImageUpload, profileImageDelete }
  from '../actions/profile';
import Radium from 'radium';
import BasicInfo from '../components/BasicInfo';
import Button from '../components/Button';

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
    this.uploadImage = this.uploadImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
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

  uploadImage(e, item, prop) {
    const { dispatch, profile } = this.props;
    e.preventDefault();
    const file = e.target.files[0];

    if (!!file) {
      dispatch(profileImageUpload(file, item, prop, profile.user.source));
    }
  }

  deleteImage(e, item, prop) {
    const { dispatch, profile } = this.props;
    e.preventDefault();

    dispatch(profileImageDelete(item, prop, profile.user.source));
  }

  updateData(e, item, prop) {
    const { dispatch, profile } = this.props;
    const newValue = e.target.value;
    if (newValue === item.value) return;

    dispatch(profileUpdate(newValue, item, prop, profile.user.source));
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
            onDelete={this.deleteImage}
            onImage={this.uploadImage}
            edit
          />
          <article style={[sharedStyle.card, profileEditStyle.leftCard]}>
            <h3 style={sharedStyle.heading}>
              <i style={sharedStyle.icon} className="fa fa-user"></i>
              Basic Information
            </h3>
            <form>
              <label style={profileEditStyle.firstName}>
                <b style={profileEditStyle.labelText}>First Name</b>
                <input
                  style={profileEditStyle.input}
                  type="text"
                  placeholder="First Name"
                  defaultValue={user.firstName.value}
                  onBlur={(e) => this.updateData(e, user.firstName,
                    'firstName')}
                />
              </label>
              <label style={profileEditStyle.lastName}>
                <b style={profileEditStyle.labelText}>Last Name</b>
                <input
                  style={profileEditStyle.input}
                  type="text"
                  placeholder="Last Name"
                  defaultValue={user.lastName.value}
                  onBlur={(e) => this.updateData(e, user.lastName, 'lastName')}
                />
              </label>
              <label style={profileEditStyle.nickName}>
                <b style={profileEditStyle.labelText}>Nickname</b>
                <input
                  style={profileEditStyle.input}
                  type="text"
                  placeholder="Nickname"
                  defaultValue={user.nickName.value}
                  onBlur={(e) => this.updateData(e, user.nickName, 'nickName')}
                />
              </label>
              <label style={profileEditStyle.fullName}>
                <b style={profileEditStyle.labelText}>Full Name</b>
                <input
                  style={profileEditStyle.input}
                  type="text"
                  placeholder="Full Name"
                  defaultValue={user.fullName.value}
                  onBlur={(e) => this.updateData(e, user.fullName, 'fullName')}
                />
              </label>
              <label style={profileEditStyle.gender}>
                <b style={profileEditStyle.labelText}>Gender</b>
                <select
                  style={profileEditStyle.select}
                  defaultValue={user.gender.value}
                  onChange={(e) => this.updateData(e, user.gender, 'gender')}
                >
                  <option>Select gender...</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </form>
          </article>
          <article style={[sharedStyle.card, profileEditStyle.leftCard]}>
            <h3 style={sharedStyle.heading}>
              <i style={sharedStyle.icon} className="fa fa-phone"></i>
              Phone Numbers
            </h3>
            <form>
              <label>
                <b style={profileEditStyle.labelText}>New Phone</b>
                <input
                  style={profileEditStyle.newInput}
                  type="tel"
                  placeholder="Phone"
                />
                <Button type="submit" style={profileEditStyle.newButton}>
                  <i style={sharedStyle.icon} className="fa fa-plus"></i>
                  Add Phone
                </Button>
              </label>
            </form>
          </article>
        </section>
    );
  }
}
