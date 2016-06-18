'use strict';

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route } from 'react-router';
import App from '../containers/App';
import Login from '../containers/Login';
import Profile from '../containers/Profile';
import ProfileEdit from '../containers/ProfileEdit';

const Routes = ({ store, history }) =>
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Profile} title="View Profile" />
        <Route path="edit" component={ProfileEdit} title="Edit Profile" edit />
        <Route path="login" component={Login} title="Login" />
      </Route>
    </Router>
  </Provider>;

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Routes;
