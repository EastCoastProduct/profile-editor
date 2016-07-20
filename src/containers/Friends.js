'use strict';

import { rdflib as $rdf, vocab } from 'solid-client';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { profileFetch, profileUpdate, getFriends, paginationChanged,
  profileUpdateAction } from '../actions/profile';
import _ from 'lodash';
import appConstants from '../constants/application';
import Radium from 'radium';
import Spinner from '../components/Spinner';
import FriendItem from '../components/FriendItem';
import Pagination from '../components/Pagination';
import FriendsForm from '../components/FriendsForm';
import WebId from '../components/WebId';
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
    this.reloadFriend = this.reloadFriend.bind(this);
    this.paginationChanged = this.paginationChanged.bind(this);
  }

  componentDidMount() {
    this.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    this.getProfile(nextProps);
  }

  getProfile(nextProps) {
    const { dispatch, location: { query: { webId } },
      profile: { errors, user } } = nextProps || this.props;

    if (webId && webId !== user.webId && !errors.get) {
      return dispatch(profileFetch(webId));
    }
    return this.getFriends(nextProps);
  }

  getFriends(nextProps) {
    const { dispatch, profile } = nextProps || this.props;

    const { start, pagFriends, pagFriendsFilter, friends } =
      this.getVariables(profile);
    if (pagFriendsFilter) {
      dispatch(getFriends(pagFriends, friends, start, PAGINATION));
    }
  }

  getVariables(profile) {
    return _.cloneDeep({
      friends: profile.user.friends,
      get pagFriends() {
        return profile.user.friends.slice(this.start, profile.pagination.end);
      },
      get pagFriendsFilter() {
        return this.pagFriends.filter(itm => !itm.data).length > 0;
      },
      source: profile.user.source,
      start: profile.pagination.start - 1,
    });
  }

  addNewFriend(value, cb) {
    const { dispatch, location, profile } = this.props;
    const item = $rdf.st($rdf.sym(location.query.webId), vocab.foaf('knows'),
      $rdf.sym(''), $rdf.sym(''));
    const { source, friends } = this.getVariables(profile);

    dispatch(profileUpdate(value, item, 'friends', source, friends, null, cb));
  }

  deleteFriend(e, key) {
    const { dispatch, profile } = this.props;
    e.preventDefault();
    const item = profile.user.friends[key];
    const { source, friends } = this.getVariables(profile);

    dispatch(profileUpdate(undefined, item, 'friends', source, friends, key));
  }

  reloadFriend(e, key) {
    const { dispatch, profile } = this.props;
    e.preventDefault();
    const { friends } = this.getVariables(profile);
    delete friends[key].data;

    dispatch(profileUpdateAction(friends, 'friends'));
  }

  paginationChanged(page, numOfPages, start, end) {
    const { dispatch } = this.props;

    dispatch(paginationChanged(page, numOfPages, start, end));
  }

  renderFriends() {
    const { profile } = this.props;

    const { pagFriends } = this.getVariables(profile);
    return pagFriends.map((friend, index) => {
      return (
        friend.data &&
          <FriendItem
            data={friend.data}
            key={index}
            index={index + (profile.pagination.page - 1) * PAGINATION}
            onDelete={this.deleteFriend}
            onReload={this.reloadFriend}
          />
      );
    });
  }

  render() {
    const { location, profile, profile: { pagination, user, errors } } =
      this.props;
    const { pagFriendsFilter } = this.getVariables(profile);

    return (
      location.query.webId && !errors.get ?
        <section>
          <article style={sharedStyle.leftCard}>
            {user.webId === location.query.webId ?
              <div>
                <h3 style={sharedStyle.heading}>
                  <i style={sharedStyle.icon} className="fa fa-users" />
                  Friends of {user.fullName.value}
                </h3>
                {pagFriendsFilter &&
                  <Spinner />
                }
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
                  onPaginationChange={this.paginationChanged}
                  total={user.friends.length}
                />
              </div> : <Spinner style={friendsStyle.mainSpinner} />
            }
          </article>
          {user.webId === location.query.webId &&
            <FriendsForm
              formKey="friendsForm"
              onAddNewFriend={this.addNewFriend}
              user={user}
            />
          }
        </section> :
        <WebId formKey="WebIdFriends" errorMsg={errors.get} goTo="/friends" />
    );
  }
}
