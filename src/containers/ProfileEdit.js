'use strict';

import { vocab } from 'solid-client';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate, profileImageUpload, profileImageDelete }
  from '../actions/profile';
import Radium from 'radium';
import ProfileCover from '../components/ProfileCover';
import BasicInfo from '../components/BasicInfo';
import AddInfo from '../components/AddInfo';
import Spinner from '../components/Spinner';
import WebId from '../components/WebId';

// Style
import sharedStyle from '../styles/shared/base';

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
    const { dispatch, location: { query: { webId } },
      profile: { user, errors } } = nextProps || this.props;

    if (webId && webId !== user.webId && !errors.get) {
      dispatch(profileFetch(webId));
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

  addDeleteItem(newValue, item, prop, source, array, arrayKey, cb) {
    const { dispatch } = this.props;

    dispatch(profileUpdate(newValue, item, prop, source, array, arrayKey, cb));
  }

  render() {
    const { location, profile: { user, errors } } = this.props;

    return (
      location.query.webId && !errors.get ?
        <section>
          {user.webId === location.query.webId ?
            <div>
              <ProfileCover
                webId={location.query.webId}
                user={user}
                onDelete={this.deleteImage}
                onImage={this.uploadImage}
                edit
              />
              <BasicInfo
                user={user}
                errors={errors}
                onUpdate={this.updateData}
                edit
              />
              <AddInfo
                formKey="addInfo1"
                errors={errors}
                icon="phone"
                name="Phone"
                onAddDeleteItem={this.addDeleteItem}
                predicate={vocab.foaf('phone')}
                prefix="tel:"
                prop="phones"
                type="tel"
                user={user}
                webId={location.query.webId}
              />
              <AddInfo
                formKey="addInfo2"
                errors={errors}
                icon="envelope"
                name="Email"
                onAddDeleteItem={this.addDeleteItem}
                predicate={vocab.foaf('mbox')}
                prefix="mailto:"
                prop="emails"
                type="email"
                user={user}
                webId={location.query.webId}
              />
              <AddInfo
                formKey="addInfo3"
                errors={errors}
                icon="rss"
                name="Blog"
                onAddDeleteItem={this.addDeleteItem}
                predicate={vocab.foaf('weblog')}
                prop="blogs"
                type="url"
                user={user}
                webId={location.query.webId}
              />
              <AddInfo
                formKey="addInfo4"
                errors={errors}
                icon="globe"
                name="Homepage"
                onAddDeleteItem={this.addDeleteItem}
                predicate={vocab.foaf('homepage')}
                prop="homepages"
                type="url"
                user={user}
                webId={location.query.webId}
              />
              <AddInfo
                formKey="addInfo5"
                errors={errors}
                icon="globe"
                name="Workpage"
                onAddDeleteItem={this.addDeleteItem}
                predicate={vocab.foaf('workplaceHomepage')}
                prop="workpages"
                type="url"
                user={user}
                webId={location.query.webId}
              />
            </div> :
            <article style={sharedStyle.card}>
              <Spinner />
            </article>
          }
        </section> :
        <WebId formKey="webIdEdit" errorMsg={errors.get} goTo="/edit" />
    );
  }
}
