const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    https: true
  },
  plugins: [
    new Dotenv({
      path: ('.env'),
      allowEmptyValues: true,
      ignoreStub: true
      }
    )
  ]
});