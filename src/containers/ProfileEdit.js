'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate, profileImageUpload, profileImageDelete }
  from '../actions/profile';
import AppConstants from '../constants/application';
import Namespaces from '../constants/namespaces';
import Radium from 'radium';
import BasicInfo from '../components/BasicInfo';
import Input from '../components/Input';
import Select from '../components/Select';
import AddInfo from '../components/AddInfo';
const { FOAF } = Namespaces;
const { GENDER_OPTIONS } = AppConstants;

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
    this.addDeleteItem = this.addDeleteItem.bind(this);
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

  addDeleteItem(newValue, item, prop, source, array) {
    const { dispatch } = this.props;

    dispatch(profileUpdate(newValue, item, prop, source, array));
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
          <article style={sharedStyle.leftCard}>
            <h3 style={sharedStyle.heading}>
              <i style={sharedStyle.icon} className="fa fa-user" />
              Basic Information
            </h3>
            <form>
              <Input
                style={profileEditStyle.firstName}
                label="First Name"
                type="text"
                placeholder="First Name"
                defaultValue={user.firstName.value}
                onBlur={(e) => this.updateData(e, user.firstName,
                    'firstName')}
              />
              <Input
                style={profileEditStyle.lastName}
                label="Last Name"
                type="text"
                placeholder="Last Name"
                defaultValue={user.lastName.value}
                onBlur={(e) => this.updateData(e, user.lastName, 'lastName')}
              />
              <Input
                style={profileEditStyle.nickName}
                label="Nickname"
                type="text"
                placeholder="Nickname"
                defaultValue={user.nickName.value}
                onBlur={(e) => this.updateData(e, user.nickName, 'nickName')}
              />
              <Input
                style={profileEditStyle.fullName}
                label="Full Name"
                type="text"
                placeholder="Full Name"
                defaultValue={user.fullName.value}
                onBlur={(e) => this.updateData(e, user.fullName, 'fullName')}
              />
              <Select
                style={profileEditStyle.gender}
                label="Gender"
                options={GENDER_OPTIONS}
                defaultValue={user.gender.value}
                onChange={(e) => this.updateData(e, user.gender, 'gender')}
              />
            </form>
          </article>
          <AddInfo
            icon="phone"
            name="Phone"
            onAddDeleteItem={this.addDeleteItem}
            predicate={new FOAF('phone')}
            prefix="tel:"
            prop="phones"
            type="tel"
            user={user}
            webId={location.query.webId}
          />
          <AddInfo
            icon="envelope"
            name="Email"
            onAddDeleteItem={this.addDeleteItem}
            predicate={new FOAF('mbox')}
            prefix="mailto:"
            prop="emails"
            type="email"
            user={user}
            webId={location.query.webId}
          />
          <AddInfo
            icon="rss"
            name="Blog"
            onAddDeleteItem={this.addDeleteItem}
            predicate={new FOAF('weblog')}
            prop="blogs"
            type="url"
            user={user}
            webId={location.query.webId}
          />
          <AddInfo
            icon="globe"
            name="Homepage"
            onAddDeleteItem={this.addDeleteItem}
            predicate={new FOAF('homepage')}
            prop="homepages"
            type="url"
            user={user}
            webId={location.query.webId}
          />
          <AddInfo
            icon="globe"
            name="Workpage"
            onAddDeleteItem={this.addDeleteItem}
            predicate={new FOAF('workplaceHomepage')}
            prop="workpages"
            type="url"
            user={user}
            webId={location.query.webId}
          />
        </section>
    );
  }
}
