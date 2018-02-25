var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackShellPlugin = require('webpack-shell-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(env) {
  env = env || {};
  return {
    target: 'web',
    name: 'web',
    entry: {
      goretailr: [
        './src/website/index.js'
      ],
      vendor: [
        './src/website/vendor/bootstrap/dist/js/bootstrap.min.js',
        './src/website/vendor/lodash/dist/lodash.min.js',
        './src/website/vendor/moment/min/moment.min.js',
        './src/website/vendor/angular/angular.min.js',
        './src/website/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
        './src/website/vendor/angular-ui-router/release/angular-ui-router.min.js',
        './src/website/vendor/a0-angular-storage/dist/angular-storage.min.js',
        './src/website/vendor/angular-jwt/dist/angular-jwt.min.js',
        './src/website/libs/socket.io.js',
        './src/website/libs/toastr/toastr.min.js',

        './src/website/style.scss',
      ]
    },
    output: {
      publicPath: '/',
      path: path.join(__dirname, 'dist/server/apps/web/public'),
      filename: '[name].js'
    },
    cache: true,
    resolve: {
      extensions: ['.js'],
      alias: {
        socket: path.resolve(__dirname, './src/website/libs/socket.io.js'),
        toastr: path.resolve(__dirname, './src/website/libs/toastr/toastr.min.js'),
        moment: path.resolve(__dirname, './src/website/vendor/moment/min/moment.min.js'),
      }
    },
    externals: { jquery: 'jQuery' },
    module: {
      rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        exclude: /node_modules/
      }, {
        test: /\.(html|hdb)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            ignoreCustomFragments: [/\{\{.*?}}/]
          }
        },
      }, {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: { import: true }
          }, 'sass-loader']
        }),
        exclude: /node_modules/
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader?name=res/[name].[ext]?[hash]'
      }]
    },

    plugins: [
      new webpack.ProvidePlugin({
        'io': 'socket',
        'moment': 'moment',
        'toastr': 'toastr',
      }),
      new ExtractTextPlugin({ filename: '[name].css' }),
      new CopyWebpackPlugin([
        { from: './src/website/index.html', to: './index.html' },
        { from: './src/website/vendor/jquery/dist/jquery.min.js', to: './vendor/jquery/dist/jquery.min.js' },
      ])
    ]
  }
};
