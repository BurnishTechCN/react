const webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const TARGET = process.env.npm_lifecycle_event;

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: TARGET === 'build' ? '"production"' : '"test"',
      },
    }),
    new CleanPlugin(['dist'], {
      root: path.join(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ],
};
