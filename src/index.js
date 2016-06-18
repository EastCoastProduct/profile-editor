'use strict';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { browserHistory } from 'react-router';
import Routes from './routes';

ReactDOM.render(
  <Routes store={store} history={browserHistory} />,
  document.getElementById('root')
);
