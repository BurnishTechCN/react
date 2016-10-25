// import React from 'react';
import App from './app';
// import requireAuthentication from 'utils/requireAuthentication';

const indexRoute = {
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const View = require('containers/Index/IndexView').default;
      callback(null, View);
    });
  },
};

const loginRoute = {
  path: 'login',
  getComponent(nextState, callback) {
    require.ensure([], (require) => {
      const View = require('containers/Login/LoginView').default;
      callback(null, View);
    });
  },
};

export default {
  path: '/',
  component: App,
  indexRoute,
  childRoutes: [
    loginRoute,
  ],
};
