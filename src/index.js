import 'styles/main.scss';

import 'babel-polyfill';
import React from 'react';
import { DEBUG } from 'config';
import { render } from 'react-dom';
import { browserHistory, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root/Root';
import configureStore from './store/configureStore';

// 生产环境不需要/#/的url,需要在nginix 做配置
const rootEl = document.getElementById('root');
const historyMode = DEBUG ? hashHistory : browserHistory;
const store = configureStore(window.INITIAL_STATE, historyMode);
const history = syncHistoryWithStore(historyMode, store);

render(
  <Root store={store} history={history} />,
  rootEl
);
