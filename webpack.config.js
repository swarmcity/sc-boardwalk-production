const path = require('path');

module.exports = {
  entry: './index.html',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './index.html',
  },
  module: {
    rules: [
      {
       test: /\.css$/,
       use: ['style-loader', 'css-loader'],

      },
    ],
    loaders: [
      {test: /\.json$/, use: 'json-loader'},
      {
          test: /\.html$/,
          loader: 'polymer-webpack-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime'],
        },
      }
    ],
  },
  devServer: {
      // serve app.html in place of 404 responses to allow HTML5 history
      historyApiFallback: true,
  },
  devtool: 'eval-source-map',
};
