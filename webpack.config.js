var path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/index.js',
  //devtool: debug ? "inline-sourcemap" : false,
  output: { 
    path: path.resolve("/dist"),
    filename: 'index_bundle.js' 
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_module/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_module/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
  },
  plugins:
  [
    HtmlWebpackPluginConfig
  ]
}