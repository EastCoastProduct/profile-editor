'use strict';

import solid from 'solid-client';
import Actions from '../constants/actions';
import AppConstants from '../constants/application';

const { LOGIN_FETCHING, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS } = Actions;
const { AUTH_ENDPOINT } = AppConstants;

function loginFetching() {
  return {
    type: LOGIN_FETCHING,
  };
}

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

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logout(router) {
  return dispatch => {
    localStorage.removeItem('webId');
    router.push('/login');
    dispatch(logoutSuccess());
  };
}

export function loginFetch(router) {
  return dispatch => {
    dispatch(loginFetching());
    solid.login(AUTH_ENDPOINT).then((webId) => {
      if (webId && webId.length > 0 && webId.slice(0, 4) === 'http') {
        dispatch(loginSuccess(webId));
        localStorage.setItem('webId', webId);
        return router.push({ pathname: '/', query: { webId } });
      }
      return dispatch(loginFailed('WebID-TLS authentication failed.'));
    }).catch((err) => {
      dispatch(loginFailed(`Could not connect to auth server: ${err}`));
    });
  };
}
