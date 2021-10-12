const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = {
  resolve: {
    fallback: {
      "fs": false
    },
  },
  entry: {
      app: './src/JS/index.js'
    },
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
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),
    new Dotenv({
      path: ('.env'),
      allowEmptyValues: true,
      ignoreStub: true
      }
    )
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