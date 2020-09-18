const webpack = require('webpack'); //to access built-in plugins
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
       { test: /\.css$/, use: ExtractTextPlugin.extract({fallback: "style-loader",use: "css-loader"})},
       { test: /\.js$/,  loader: "babel-loader", exclude:/node_modules/, query: {presets:["env"]}},
    ]
  },
  // resolve:{
  //   fallback: path.join(__dirname,"src/js/helper")
  // },
  devServer: {
    stats: "errors-only",
    compress: true
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebpackPlugin({
      title:"Todo App BB & WP",
      // inject:"head",
      filename:"index.html",
      template:'./index.html',
      hash: true,
      minify:{ collapseWhitespace: false },
    })
  ]
};

module.exports = config;