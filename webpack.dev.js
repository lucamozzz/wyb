const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  entry: {
      app: './src/JS/index_dev.js'
    },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    https: true
  }
});