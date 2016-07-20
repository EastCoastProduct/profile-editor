'use strict';

import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route } from 'react-router';
import App from '../containers/App';
import Login from '../containers/Login';
import Profile from '../containers/Profile';
import ProfileEdit from '../containers/ProfileEdit';
import Friends from '../containers/Friends';
import WebId from '../components/WebId';
import Page404 from '../components/Page404';

const Routes = ({ store, history }) =>
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Profile.Profile} title="View Profile" view />
        <Route path="edit" component={ProfileEdit} title="Edit Profile" />
        <Route path="login" component={Login} title="Login" />
        <Route path="friends" component={Friends} title="Friends" />
        <Route path="setWebId" component={WebId} title="Set WebId" />
        <Route path="*" component={Page404} title="Page 404" />
      </Route>
    </Router>
  </Provider>;

Routes.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Routes;
