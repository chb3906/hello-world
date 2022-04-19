'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const vuxLoader = require('vux-loader')
const webpack = require("webpack")
const CopyWebpackPlugin = require('copy-webpack-plugin')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


const webpackConfig = {
  context: path.resolve(__dirname, '../'),
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "../IYTS19f9Tz.txt"),
        to: path.join(__dirname, "../dist/IYTS19f9Tz.txt")
      }, 
      {
        from: path.join(__dirname, "../ouokIFkDYx.txt"),
        to: path.join(__dirname, "../dist/ouokIFkDYx.txt")
      }, 
      {
        from: path.join(__dirname, "../NWRBe5uI7b.txt"),
        to: path.join(__dirname, "../dist/NWRBe5uI7b.txt")
      }, 
      {
        from: path.join(__dirname, "../5e3ee85be934f394994b8da1cf794ff2.html"),
        to: path.join(__dirname, "../dist/5e3ee85be934f394994b8da1cf794ff2.html")
      },
      {
        from: path.join(__dirname, "../476ac32d28b96b1499c2d933926f8376.html"),
        to: path.join(__dirname, "../dist/476ac32d28b96b1499c2d933926f8376.html")
      },
      {
        from: path.join(__dirname, "../8pQDuuHdz5.txt"),
        to: path.join(__dirname, "../dist/8pQDuuHdz5.txt")
      },{
        from: path.join(__dirname, "../Ku9HEp2oht.txt"),
        to: path.join(__dirname, "../dist/Ku9HEp2oht.txt")
      },{
        from: path.join(__dirname, "../j3bsByTFb8.txt"),
        to: path.join(__dirname, "../dist/j3bsByTFb8.txt")
      },{
        from: path.join(__dirname, "../ai2Un5Uso6.txt"),
        to: path.join(__dirname, "../dist/ai2Un5Uso6.txt")
      },{
        from: path.join(__dirname, "../rCZ3iIMTEC.txt"),
        to: path.join(__dirname, "../dist/rCZ3iIMTEC.txt")
      }
    ])
  ],
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json','.less'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
	  'vendor':path.resolve(__dirname,'../src/components/productPC/vendor'),
    }
  },
  module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ],

    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    },
    {
      name: 'less-theme',
      path: 'src/stylesheets/vux-theme.less' // 相对项目根目录路径
    }
  ]
})