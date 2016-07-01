'use strict';

import Actions from '../constants/actions';
import appConstants from '../constants/application';
const { PROFILE_GET_SUCCESS, PROFILE_GET_FAILED, PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED, PROFILE_IMAGE_UPLOAD_FAILED, FRIEND_GET_SUCCESS,
  PAGINATION_CHANGED } = Actions;
const { PAGINATION } = appConstants;

const initialState = {
  error: null,
  pagination: {
    end: PAGINATION,
    page: 1,
    start: 1,
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
    case PROFILE_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.user),
        error: null,
      });
    case FRIEND_GET_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, {
          friends: action.friends,
        }),
      });
    case PAGINATION_CHANGED:
      return Object.assign({}, state, {
        pagination: {
          end: action.end,
          page: action.page,
          start: action.start,
        },
      });
    case PROFILE_GET_FAILED:
    case PROFILE_UPDATE_FAILED:
    case PROFILE_IMAGE_UPLOAD_FAILED:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
};
