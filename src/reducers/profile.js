'use strict';

import Actions from '../constants/actions';
const { PROFILE_GET_SUCCESS, PROFILE_GET_FAILED } = Actions;

const initialState = {
  user: {
    bcgImg: {},
    empty: true,
    firstName: {},
    fullName: {},
    gender: {},
    keystore: {},
    lastName: {},
    nickName: {},
    profileImg: {},
    source: {},
  },
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_GET_SUCCESS:
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, action.user),
        error: null,
      });
    case PROFILE_GET_FAILED:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
};
