'use strict';

import Actions from '../constants/actions';
const { LOGIN_SUCCESS, LOGIN_FAILED } = Actions;

const initialState = {
  webId: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        webId: action.user,
        error: null,
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        error: action.error,
      });
    default:
      return state;
  }
};
