var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './lib/index'
  ],
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets/'
  },
  plugins: [
    // Hot loader
    new webpack.HotModuleReplacementPlugin(),
    // Ignore the error when refresh web page
    new webpack.NoErrorsPlugin(),
    // Global paramters
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true : false
    }),
    // Extract all style into a single file
    new ExtractTextPlugin('app.css', { allChunks: true }),
    // Html template
    new HtmlWebpackPlugin({
      title: 'Redux React Router Async Example',
      filename: 'index.html',
      template: 'index.template.html',
      favicon: path.join(__dirname, 'assets', 'images', 'favicon.ico')
    })
  ],
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!cssnext-loader') },
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'lib') }
    ]
  },
  cssnext: {
    browsers: 'last 2 versions'
  }
};
