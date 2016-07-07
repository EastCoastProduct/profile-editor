'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate, profileImageUpload, profileImageDelete }
  from '../actions/profile';
import Radium from 'radium';
import Namespaces from '../constants/namespaces';
import ProfileCover from '../components/ProfileCover';
import BasicInfo from '../components/BasicInfo';
import AddInfo from '../components/AddInfo';
import WebId from '../components/WebId';
const { FOAF } = Namespaces;

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
    this.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    this.getProfile(nextProps);
  }

  getProfile(nextProps) {
    const { dispatch, location, profile: { user, error } } =
      nextProps || this.props;

    if (location.query.webId && location.query.webId !== user.webId && !error) {
      dispatch(profileFetch(location.query.webId));
    }
  }

  uploadImage(e, item, prop) {
    const { dispatch, profile: { user: { source } } } = this.props;
    e.preventDefault();
    const file = e.target.files[0];

    if (!!file) {
      dispatch(profileImageUpload(file, item, prop, source));
    }
  }

  deleteImage(e, item, prop) {
    const { dispatch, profile: { user: { source } } } = this.props;
    e.preventDefault();

    dispatch(profileImageDelete(item, prop, source));
  }

  updateData(e, item, prop) {
    const { dispatch, profile: { user: { source } } } = this.props;
    const newValue = e.target.value;
    if (newValue === item.value) return;

    dispatch(profileUpdate(newValue, item, prop, source));
  }

  addDeleteItem(newValue, item, prop, source, array) {
    const { dispatch } = this.props;

    dispatch(profileUpdate(newValue, item, prop, source, array));
  }

  render() {
    const { location, profile: { user, error } } = this.props;

    return (
      location.query.webId && !error ?
        user.webId === location.query.webId &&
          <section>
            <ProfileCover
              webId={location.query.webId}
              user={user}
              onDelete={this.deleteImage}
              onImage={this.uploadImage}
              edit
            />
            <BasicInfo user={user} onUpdate={this.updateData} edit />
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
          </section> :
        <WebId error={error} goTo="/edit" />
    );
  }
}
