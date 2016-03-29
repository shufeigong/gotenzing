/**
 * Created by insu on 16-01-21.
 */
const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname + './src/js');
const APP_DIR = path.resolve(__dirname + './dist/js');

const plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false,
    },
  })
];

const config = {
  devtool: 'cheap-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    APP_DIR + '/index.js',
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel?cacheDirectory,presets[]=es2015'
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  },
  plugins: plugins,
  devServer: {
    contentBase: './dist',
    hot: true
    }

};

module.exports = config;