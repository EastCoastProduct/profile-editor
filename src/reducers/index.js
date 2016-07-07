'use strict';

import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import app from './app';
import login from './login';
import profile from './profile';

const rootReducer = combineReducers({
  app,
  login,
  profile,
  form,
});

export default rootReducer;
