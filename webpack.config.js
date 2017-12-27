'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const styleLintPlugin = require('stylelint-webpack-plugin');

require('es6-promise').polyfill();

module.exports = {
  entry: './app.js',

  output: {
    path: __dirname,
    filename: 'js/app.js'
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin({ // define where to save the file
      filename: 'css/app.min.css',
      allChunks: true,
    }),

    // Stylelint plugin
    new styleLintPlugin({
      configFile: '.stylelintrc',
      context: '',
      files: '**/*.scss',
      syntax: 'scss',
      failOnError: false,
      quiet: false
    }),

    // new UglifyJsPlugin({
    //   sourceMap: true,
    // }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test:  /\.(css|sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        })
      }
    ]
  },

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};
