require('es6-promise').polyfill();
var path = require('path');
var join = path.join;
var dir = path.resolve(__dirname);

module.exports = {

  cache: true,
  devtool: 'source-map',
  entry: 'test/test.js',

  output: {
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          join(dir, 'node_modules/sentry'),
          join(dir, 'node_modules/stateful'),
          join(dir, 'node_modules/store'),
          join(dir, 'node_modules/bin.js'),
          join(dir, 'test'),
          join(dir, 'index.js'),
          join(dir, 'lib')
        ],
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  resolve: {
    root: dir,
    extensions: ['', '.js'],
    alias: {
      'persist-sequencer': dir
    }
  }

};
