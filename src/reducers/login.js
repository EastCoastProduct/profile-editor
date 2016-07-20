'use strict';

import Actions from '../constants/actions';
const { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS, LOGIN_FETCHING } = Actions;

const initialState = {
  error: null,
  spinner: false,
  webId: localStorage.getItem('webId') || null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_FETCHING:
      return Object.assign({}, state, {
        spinner: true,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        spinner: false,
        webId: action.webId,
      });
    case LOGIN_FAILED:
      return Object.assign({}, state, {
        error: action.error,
        spinner: false,
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        webId: localStorage.getItem('webId') || null,
      });
    default:
      return state;
  }
};
