'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'app'),

  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'dist/bundle.js',
    // the output bundle

    path: path.resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['env'],
          //   plugins: [require('babel-plugin-transform-object-rest-spread')]
          // }
        },
      },
      {
        test: /\.jsxs?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]&sourceMap',
          'sass-loader?sourceMap'
        ]
      }
    ]
  },
  resolve: {
    // fallback: path.join(__dirname, "node_modules"),
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      rljs: path.resolve(__dirname, 'rljs/'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};
//
// var path = require('path');
// var webpack = require('webpack');
//
// module.exports = {
//   devtool: 'source-map',
//   entry: [
//     'webpack-hot-middleware/client?reload=true',
//     path.join(__dirname, 'app/main.js')
//   ],
//   output: {
//     path: path.join(__dirname, '/dist/'),
//     filename: '[name].js',
//     publicPath: '/'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: 'app/index.tpl.html',
//       inject: 'body',
//       filename: 'index.html'
//     }),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin(),
//     new webpack.DefinePlugin({
//       'process.env.NODE_ENV': JSON.stringify('development')
//     })
//   ],
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         loader: 'awesome-typescript-loader'
//       },
//       {
//         test: /\.jsx?$/,
//         exclude: /(node_modules|bower_components)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['env'],
//             plugins: [require('babel-plugin-transform-object-rest-spread')]
//           }
//         },
//       },
//       {
//         test: /\.jsxs?$/,
//         exclude: /node_modules/,
//         loader: 'babel'
//       },
//       {
//         test: /\.json?$/,
//         loader: 'json'
//       },
//       {
//         test: /\.css$/,
//         loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
//       },
//       {
//         test: /\.scss$/,
//         loaders: [
//           'style',
//           'css?modules&localIdentName=[name]---[local]---[hash:base64:5]&sourceMap',
//           'sass?sourceMap'
//         ]
//       }
//     ]
//   },
//   resolve: {
//     fallback: path.join(__dirname, "node_modules"),
//     extensions: ['.ts', '.tsx', '.js', '.jsx'],
//     alias: {
//       rljs: 'rljs/dist'
//     }
//   },
//   externals: {
//     "react": "React",
//     "react-dom": "ReactDOM"
//   }
//   //  resolveLoader: { fallback: path.join(__dirname, "node_modules") }
// };
