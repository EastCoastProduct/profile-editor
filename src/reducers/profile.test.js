'use strict';

import reducer from './profile';
import Actions from '../constants/actions';
import { expect } from 'chai';
const { PROFILE_GET_SUCCESS, PROFILE_UPDATE, PROFILE_RESET,
  PROFILE_ACTION_FAILED, FRIENDS_GET_SUCCESS, PAGINATION_CHANGED } = Actions;

const initialState = {
  errors: {
    get: null,
    update: null,
  },
  pagination: {
    end: null,
    numOfPages: null,
    page: null,
    start: null,
  },
  user: {
    bcgImg: {},
    blogs: [],
    emails: [],
    firstName: {},
    friends: [],
    fullName: {},
    gender: {},
    homepages: [],
    keystore: {},
    lastName: {},
    nickName: {},
    phones: [],
    profileImg: {},
    source: {},
    webId: null,
    workpages: [],
  },
};

let dummyUser = {
  user: {
    bcgImg: {},
    blogs: [],
    emails: [ 'test@email.com' ],
    firstName: 'Jhon',
    friends: [],
    fullName: 'Jhon Doe',
    gender: {},
    homepages: [],
    keystore: {},
    lastName: 'Doe',
    nickName: 'Nickname',
    phones: [],
    profileImg: {},
    source: {},
    webId: null,
    workpages: [],
  }
};

let dummyUserFriends = Object.assign({}, dummyUser);

dummyUserFriends.user.friends = [
  '1. friend', '2. friend', '3. friend', '4.friend', '5 friend', '6 friend',
  '7 friend', '8 friend'
];

let dummyUserPagination = Object.assign({}, initialState);

dummyUserPagination.pagination = {
  end: 5,
  numOfPages: 15,
  page: 1,
  start: 1,
};

let resetProfileFailed = Object.assign({}, initialState);

resetProfileFailed.errors = {
  get: 'get error',
  update: 'update error',
};

describe('Profile reducer', () => {

  it('should return the initial state', () => {
    var newStore = reducer(undefined, PROFILE_GET_SUCCESS);

    expect(newStore).to.eql({
      errors: {
        get: null,
        update: null,
      },
      pagination: {
        end: null,
        numOfPages: null,
        page: null,
        start: null,
      },
      user: {
        bcgImg: {},
        blogs: [],
        emails: [],
        firstName: {},
        friends: [],
        fullName: {},
        gender: {},
        homepages: [],
        keystore: {},
        lastName: {},
        nickName: {},
        phones: [],
        profileImg: {},
        source: {},
        webId: null,
        workpages: [],
      },
    });
  });

  it('should return dummy profile', () => {
    var newStore = reducer(initialState, {
      type: PROFILE_GET_SUCCESS,
      user: dummyUser.user,
    });

    expect(newStore).to.eql({
      errors: {
        get: null,
        update: null,
        upload: null,
      },
      pagination: {
        end: null,
        numOfPages: null,
        page: null,
        start: null,
      },
      user: dummyUser.user,
    });
  });

  it('should return user friends', () => {
    var newStore = reducer(dummyUser, {
      type: FRIENDS_GET_SUCCESS,
      friends: dummyUserFriends.user.friends,
    });

    expect(newStore).to.eql({
      user: dummyUserFriends.user,
    });
  });

  it('should change pagination', () => {
    var newStore = reducer(initialState, {
      type: PAGINATION_CHANGED,
      end: dummyUserPagination.pagination.end,
      numOfPages: dummyUserPagination.pagination.numOfPages,
      page: dummyUserPagination.pagination.page,
      start: dummyUserPagination.pagination.start,
    });

    expect(newStore).to.eql({
      errors: dummyUserPagination.errors,
      pagination: dummyUserPagination.pagination,
      user: dummyUserPagination.user,
    });
  });

  it('should reset profile success', () => {
    var newStore = reducer(dummyUser, {
      type: PROFILE_RESET,
    });

    expect(newStore).to.eql(initialState);
  });

  it('should failed to reset profile', () => {
    var newStore = reducer({}, {
      type: PROFILE_ACTION_FAILED,
      errors: resetProfileFailed,
    });

    expect(newStore).to.eql({
      errors: resetProfileFailed,
    });
  });

});
