'use strict';

import 'whatwg-fetch';
import Actions from '../constants/actions';
import AppConstants from '../constants/application';
const { LOGIN_SUCCESS, LOGIN_FAILED } = Actions;
const { AUTH_ENDPOINT } = AppConstants;

function loginSuccess(webId) {
  return {
    type: LOGIN_SUCCESS,
    webId,
  };
}

function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}

export function loginFetch() {
  return dispatch => {
    fetch(AUTH_ENDPOINT, {
      method: 'HEAD',
    })
    .then(res => {
      const user = res.headers.get('User');
      if (user && user.length > 0 && user.slice(0, 4) === 'http') {
        return dispatch(loginSuccess(user));
      }
      return dispatch(loginFailed('WebID-TLS authentication failed.'));
    })
    .catch(err => {
      dispatch(loginFailed(`Could not connect to auth server: ${err}`));
    });
  };
}
