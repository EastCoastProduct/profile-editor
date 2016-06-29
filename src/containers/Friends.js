'use strict';

import $rdf from 'rdflib';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate, getFriends } from '../actions/profile';
import Radium from 'radium';
import Namespaces from '../constants/namespaces';
import Input from '../components/Input';
import FriendItem from '../components/FriendItem';
import WebId from '../components/WebId';
const { FOAF } = Namespaces;

// Style
import sharedStyle from '../styles/shared/base';
import friendsStyle from '../styles/containers/friends';

@connect(state => ({
  profile: state.profile,
}))
@Radium
export default class Friends extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
  };

  constructor() {
    super();
    this.addNewFriend = this.addNewFriend.bind(this);
    this.deleteFriend = this.deleteFriend.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  componentWillUpdate(nextProps) {
    this.getProfile(nextProps);
  }

  getProfile(nextProps) {
    const { dispatch, location, profile } = nextProps || this.props;

    if (location.query.webId && profile.user.webId !== location.query.webId) {
      return dispatch(profileFetch(location.query.webId));
    }

    if (profile.user.friends.filter((item) => !item.data).length > 0) {
      return this.getFriends(nextProps);
    }
    return false;
  }

  getFriends(nextProps) {
    const { dispatch, profile } = nextProps || this.props;

    dispatch(getFriends(profile.user.friends));
  }

  addNewFriend(e) {
    const { dispatch, location, profile } = this.props;
    e.preventDefault();
    const newValue = e.target.elements.friend.value;
    const item = $rdf.st($rdf.sym(location.query.webId), new FOAF('knows'),
      $rdf.sym(''), $rdf.sym(''));
    const array = profile.user.friends;

    dispatch(profileUpdate(newValue, item, 'friends', profile.user.source,
      array, () => {
        this.getFriends();
      }));
  }

  deleteFriend(e, key) {
    const { dispatch, profile } = this.props;
    e.preventDefault();
    const item = profile.user.friends[key];
    const array = profile.user.friends;
    array.splice(key, 1);

    dispatch(profileUpdate(undefined, item, 'friends', profile.user.source,
      array));
  }

  renderFriends(friends) {
    return friends.map((friend, index) => {
      return (
        friend.data &&
          <FriendItem
            data={friend.data}
            key={index}
            index={index}
            onDelete={this.deleteFriend}
            url={friend.object.uri}
          />
      );
    });
  }

  render() {
    const { location, profile } = this.props;
    const { user } = profile;

    return (
      location.query.webId ?
        user.webId === location.query.webId &&
          <section>
            <article style={sharedStyle.leftCard}>
              <h3 style={sharedStyle.heading}>
                <i style={sharedStyle.icon} className="fa fa-users" />
                Friends of {user.fullName.value}
              </h3>
              {user.friends.length > 0 ?
                <ul>{this.renderFriends(user.friends)}</ul> :
                <p style={sharedStyle.infoMsg}>
                  There are no friends at the moment.
                </p>
              }
            </article>
            <article style={sharedStyle.leftCard}>
              <form onSubmit={this.addNewFriend}>
                <Input
                  style={friendsStyle.label}
                  label="New Friend"
                  name="friend"
                  type="url"
                  placeholder="WebId of your friend"
                  button="Add Friend"
                />
              </form>
            </article>
          </section> :
        <WebId goTo="/friends" />
    );
  }
}
