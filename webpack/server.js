/* eslint no-console: 0 */
require('babel-polyfill');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./common');

const serverHost = '0.0.0.0';

new WebpackDevServer(webpack(config), config.devServer)
  .listen(config.devServer.port, serverHost, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('==> ✅  Static file server started at http://' + serverHost + ':' + config.devServer.port);
    }
  });
