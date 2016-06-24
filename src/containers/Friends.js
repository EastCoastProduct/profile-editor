'use strict';

import $rdf from 'rdflib';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate } from '../actions/profile';
import { Link as RRLink } from 'react-router';
import Radium from 'radium';
import Namespaces from '../constants/namespaces';
import Input from '../components/Input';
import Button from '../components/Button';
const Link = new Radium(RRLink);
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
    const { profile } = this.props;

    if (profile.user.empty) this.getProfile();
  }

  getProfile() {
    const { dispatch, location } = this.props;

    dispatch(profileFetch(location.query.webId, undefined, () => {
      this.getFriends();
    }));
  }

  getFriends() {
    const { dispatch, profile } = this.props;

    profile.user.friends.forEach((friend, key) => {
      if (friend.data) return;
      dispatch(profileFetch(friend.object.uri, key));
    });
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
    return friends.map((friend, key) => {
      return (
        friend.data &&
          <li style={friendsStyle.listItem} key={key}>
            <img
              style={friendsStyle.image}
              src={(friend.data && friend.data.profileImg.value) ||
                'http://igi.icmconsulting.com/static/events/img/blank-user.jpg'}
              alt={`${friend.data && friend.data.fullName.value}'s Profile`}
            />
            <div style={friendsStyle.details}>
              {friend.data && friend.data.fullName &&
                <h4 style={friendsStyle.name}>{friend.data.fullName.value}</h4>
              }
              {friend.data && friend.data.emails.length > 0 &&
                <p style={friendsStyle.email}>
                  {friend.data.emails[0].value &&
                    friend.data.emails[0].value.replace('mailto:', '')}
                </p>
              }
              {friend.object.uri &&
                <Link
                  style={friendsStyle.link}
                  to={`/?webId=${encodeURIComponent(friend.object.uri)}`}
                >
                  {friend.object.uri}
                </Link>
              }
            </div>
            <Button
              style={friendsStyle.trashIcon}
              onClick={(e) => this.deleteFriend(e, key)}
              empty
            >
              <i className="fa fa-trash"></i>
            </Button>
          </li>
      );
    });
  }

  render() {
    const { profile } = this.props;
    const { user } = profile;

    return (
      !user.empty &&
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
        </section>
    );
  }
}
