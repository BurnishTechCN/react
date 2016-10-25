const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const development = require('./dev.js');
const production = require('./prod.js');

require('babel-polyfill').default;

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, '../src/'),
  build: path.join(__dirname, '../dist/'),
  nodeModules: path.join(__dirname, '../node_modules/'),
};

const VENDOR = [
  'react',
  'redux',
  'react-dom',
  'classnames',
  'react-redux',
  'react-router',
  'babel-polyfill',
  'react-router-redux',
];

process.env.BABEL_ENV = TARGET;

const common = {
  entry: {
    app: [PATHS.app],
    vendor: VENDOR,
  },

  output: {
    filename: '[name].[hash].js',
    path: PATHS.build,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      hash: true,
      filename: 'index.html',
      favicon:'./src/images/favicon.png',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.[hash].js'})
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', PATHS.app],
  },

  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      include: PATHS.app,
      exclude: /styles/,
      loader: 'eslint-loader',
    }],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css|sass|scss)$/,
        loader: ExtractTextPlugin.extract("style-loader", ["css-loader", "postcss-loader", "sass-loader"])
      },
      {
        test: /\.(jpe?g|png|gif|bmp|ico)$/i,
        loader: 'file?name=img/[name].[ext]',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/octet-stream',
      }, {
        test: /\.md$/,
        loader: 'raw',
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.json(\?.*)?$/,
        loader: 'file-loader?name=/files/[name].[ext]'
      }
    ]
  },

  postcss: () => {
    return [
      autoprefixer,
      precss,
    ];
  },
  devServer: {
    contentBase: PATHS.app,
    hot: false,
    inline: true,
    port: 9000,
    noInfo: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    stats: {
      colors: true,
    },
  },
};

if (TARGET === 'start') {
  module.exports = merge(development, common);
}

if (TARGET === 'build' || TARGET === 'build:test') {
  module.exports = merge(production, common);
}
