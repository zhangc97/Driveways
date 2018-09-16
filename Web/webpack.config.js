var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader' },
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        'url-loader?limit=10000',
        'img-loader'
      ]
    }
    ]
  },
  devServer: {
    historyApiFallback:true
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'app/index.html'
  })],
  mode:"development",
};
