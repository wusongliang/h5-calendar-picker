const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    calendar: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
    libraryTarget: 'umd'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, ''),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'calendar.css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserWebpackPlugin(),
    ],
  },
};