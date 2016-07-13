'use strict';

import Actions from '../constants/actions';
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

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_GET_SUCCESS:
    case PROFILE_UPDATE:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.user),
        errors: {
          get: null,
          update: null,
          upload: null,
        },
      });
    case FRIENDS_GET_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          friends: action.friends,
        }),
      });
    case PAGINATION_CHANGED:
      return Object.assign({}, state, {
        pagination: {
          end: action.end,
          numOfPages: action.numOfPages,
          page: action.page,
          start: action.start,
        },
      });
    case PROFILE_RESET:
      return Object.assign({}, initialState);
    case PROFILE_ACTION_FAILED:
      return Object.assign({}, state, {
        errors: Object.assign({}, state.errors, action.errors),
      });
    default:
      return state;
  }
};
