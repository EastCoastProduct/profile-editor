'use strict';

import $rdf from 'rdflib';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate, getFriends, paginationChanged }
  from '../actions/profile';
import appConstants from '../constants/application';
import Radium from 'radium';
import Namespaces from '../constants/namespaces';
import FriendItem from '../components/FriendItem';
import Pagination from '../components/Pagination';
import Input from '../components/Input';
import WebId from '../components/WebId';
const { FOAF } = Namespaces;
const { PAGINATION } = appConstants;

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
    this.onPaginationChange = this.onPaginationChange.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    this.getProfile(nextProps);
  }

  onPaginationChange(page, numOfPages, start, end) {
    const { dispatch } = this.props;

    dispatch(paginationChanged(page, numOfPages, start, end));
  }

  getProfile(nextProps) {
    const { dispatch, location, profile } = nextProps || this.props;

    if (location.query.webId && profile.user.webId !== location.query.webId) {
      return dispatch(profileFetch(location.query.webId));
    }
    return this.getFriends(nextProps);
  }

  getFriends(nextProps) {
    const { dispatch, profile } = nextProps || this.props;

    const start = profile.pagination.start - 1;
    const end = profile.pagination.end;
    const pagFriends = profile.user.friends.slice(start, end);

    if (pagFriends.filter(itm => !itm.data).length > 0) {
      dispatch(getFriends(pagFriends, profile.user.friends, start, PAGINATION));
    }
  }

  addNewFriend(e) {
    const { dispatch, location, profile } = this.props;
    e.preventDefault();
    const newValue = e.target.elements.friend.value;
    const item = $rdf.st($rdf.sym(location.query.webId), new FOAF('knows'),
      $rdf.sym(''), $rdf.sym(''));
    const array = profile.user.friends;

    dispatch(profileUpdate(newValue, item, 'friends', profile.user.source,
      array));
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

  renderFriends() {
    const { profile } = this.props;

    const start = profile.pagination.start - 1;
    const end = profile.pagination.end;
    const pagFriends = profile.user.friends.slice(start, end);

    return pagFriends.map((friend, index) => {
      return (
        friend.data &&
          <FriendItem
            data={friend.data}
            key={index}
            index={index + (profile.pagination.page - 1) * PAGINATION}
            onDelete={this.deleteFriend}
            url={friend.object.uri}
          />
      );
    });
  }

  render() {
    const { location, profile } = this.props;
    const { pagination, user } = profile;

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
                <ul>{this.renderFriends()}</ul> :
                <p style={sharedStyle.infoMsg}>
                  There are no friends at the moment.
                </p>
              }
              <Pagination
                currentEnd={pagination.end}
                currentPage={pagination.page}
                currentStart={pagination.start}
                itemsPerPage={PAGINATION}
                numOfPages={pagination.numOfPages}
                onPaginationChange={this.onPaginationChange}
                total={user.friends.length}
              />
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
