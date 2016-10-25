const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const PATHS = {
  app: path.join(__dirname, '../src/'),
};

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://0.0.0.0:9000',
      PATHS.app,
    ],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};
