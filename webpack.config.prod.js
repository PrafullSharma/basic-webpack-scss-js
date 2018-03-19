'use strict';

const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const styleLintPlugin = require('stylelint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminMozjpeg = require('imagemin-mozjpeg')

require('es6-promise').polyfill();

module.exports = {
  entry: './app.js',

  output: {
    filename: 'js/app.js',
    path: path.resolve(__dirname, '')
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin({ // define where to save the file
      filename: 'css/app.min.css',
      allChunks: true
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

    // Copy the images folder and optimize all the images
    new CopyWebpackPlugin([{
      from: 'images/',
      to: 'images/'
    }]),

    new ImageminPlugin({
      gifsicle: {
        interlaced: false,
        optimizationLevel: 3
      },
      jpegtran: false, // disabled
      optipng: false, // disabled
      pngquant: {
        speed: 1,
        quality: 98
      },
      svgo: {
        plugins: [
          { removeTitle: true },
          { convertPathData: false }
        ]
      },
      plugins: [
        imageminMozjpeg({
          quality: 90,
          progressive: true
        })
      ]
    })

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
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ],
          publicPath: "../"
        })
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000, // Convert images < 1kb to base64 strings [hash]-[name].[ext]
            name: 'images/[name].[ext]'
          }
        }]
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
