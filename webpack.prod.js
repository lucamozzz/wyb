const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  entry: {
      app: './src/JS/index.js'
    },
  mode: 'production',
  devtool: 'source-map'
});