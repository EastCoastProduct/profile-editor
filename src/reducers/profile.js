'use strict';

import Actions from '../constants/actions';
const { PROFILE_GET_SUCCESS, PROFILE_GET_FAILED, PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILED, PROFILE_IMAGE_UPLOAD_FAILED, FRIEND_GET_SUCCESS } =
  Actions;

const initialState = {
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
  error: null,
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
