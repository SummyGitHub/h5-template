const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')  
const ExtractTextPlugin = require('extract-text-webpack-plugin')  // css样式从文件中分离出来
module.exports = {
  devtool: 'eval-source-map',
  entry: './js/preload.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'load.js'
  },
  module: {
    rules: [
      {
        test: /.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /.scss$/,
        use: [
          {
            loader: ExtractTextPlugin.extract("style",'style!css!sass')
          }
        ]
      },
      {
        test: /.js$/, 
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],
  optimization: {
    minimize: true,
  },
  devServer: {
    inline: true,
    // contentBase: '/',
    historyApiFallback: true
  }
}