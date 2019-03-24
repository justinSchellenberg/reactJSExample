'use strict';
const { Entry } = require('bms-webpack-generator');

const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AssetsPlugin = require('assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

const isDebug = process.env.NODE_ENV !== 'production';
const mode = `${isDebug ? "development" : "production"}`;

const watchOutputDir = process.env.BETA_MODE === 'true' ? './_ASSETS' : '../assets';

const entries = new Entry(
    ['builds',
      //'polyfills' // IF YOU REQUIRE POLYFILLS, uncomment and gt file location for more information
    ]);

module.exports = {
  mode: mode,

  entry: entries.getEntries(),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/,

        use: [
          {
            loader: MiniCssExtractPlugin.loader

          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDebug,
            },
          },

          {
            loader: 'postcss-loader',
            options: {
              sourceMap: isDebug,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDebug,
            },
          },
        ],
      },
      {
        test: /\.(jpg|jpeg|gif|png|svg|woff|woff2)$/,
        // File loader
        // https://github.com/webpack-contrib/file-loader
        loader: 'file-loader',
        options: {
          emitFile: false,
          name: 'assets/[name][hash].[ext]'
        }
      }
    ],
  },


  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    // This Filename NEEDS to be same as within the package.json Scripts if using "wait-on" to avoid race conditions
    new AssetsPlugin({filename: '_assets.json'}),
  ],

  optimization: {
    minimizer: [
      ...(isDebug ? [] : [
        // Minimize all JavaScript output of chunks
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true // set to true if you want JS source maps
        })
      ]),

      ...(isDebug ? [] : [
        // Minimize all Css output of chunks
        // https://github.com/NMFR/optimize-css-assets-webpack-plugin
        new OptimizeCSSAssetsPlugin({})
      ]),
    ]
  },

  devtool: isDebug ? 'inline-source-map' : false,

  // Don't attempt to continue if there are any errors.
  // https://webpack.js.org/configuration/other-options/#bail
  bail: !isDebug,

  // Cache the generated webpack modules and chunks to improve build speed
  // https://webpack.js.org/configuration/other-options/#cache
  cache: isDebug,

  // Precise control of what bundle information gets displayed
  // https://webpack.js.org/configuration/stats/
  stats: isDebug ? 'normal' : 'minimal',

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss'],
  },
  output: {
    filename: '[name].bundle.js',
    path: isDebug ? path.resolve(__dirname, watchOutputDir) : path.resolve(__dirname, '../assets'),
    //publicPath: isDebug ? '/' : null
  },

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
