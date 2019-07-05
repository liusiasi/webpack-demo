const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const commonConfig = {
  entry: {
      main: './src/index.js'
  },
  module: {
      rules: [{
          test: /\.png$/,
          use: {
              loader: 'url-loader',
              options: {
                  name: '[name]_[hash].[ext]',
                  outputPath: 'images/',
                  limit: 2048
              }
          }
      },{
          test: /\.scss$/,
          use: [
              MiniCssExtractPlugin.loader,
              {
                  loader: 'css-loader',
                  options: {
                      importLoaders: 2,
                  }
              },
              "sass-loader",
              "postcss-loader"
          ]
      },{
          test: /\.css$/,
          use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
          ]
      },{
          test: /\.(eot|ttf|svg|woff|woff2)$/,
          use: {
              loader: 'file-loader'
          }
      },{ 
          test: /\.js$/, 
          exclude: /node_modules/, 
          use: [{
            loader: 'babel-loader'
          }]
      }]
  },
  plugins: [new HtmlWebpackPlugin({
      template: 'src/index.html'
  }),new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css',
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    _join: ['lodash', 'join']
  })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  },
  performance: false,
}

module.exports = (env) => {
  if( env && env.production )
  {
    return merge(commonConfig, prodConfig);
  }
  else{
    return merge(commonConfig, devConfig);
  }
}