'use strict';

import { reducer as form } from 'redux-form';
import { combineReducers } from 'redux';
import login from './login';
import profile from './profile';

const rootReducer = combineReducers({
  login,
  profile,
  form,
});

export default rootReducer;
