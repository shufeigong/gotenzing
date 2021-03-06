/**
 * Created by insu on 16-01-21.
 */
var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname + '/../src/js');
var APP_DIR = path.resolve(__dirname);

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
            {
              test: /\.jsx?/,
              include: APP_DIR,
              loader: 'babel',
            },
        ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    })
  ]
};

module.exports = config;
