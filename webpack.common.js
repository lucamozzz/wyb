const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new Dotenv({
      path: '.env'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use:"html-loader"
      },
      {
         test: /\.(s(a|c)ss)$/,
         use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};