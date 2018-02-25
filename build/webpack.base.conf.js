'use strict'

// 该文件主要完成了下面这些事情：
// 1.配置webpack编译入口
// 2.配置webpack输出路径和命名规则
// 3.配置模块resolve规则
// 4.配置不同类型模块的处理规则
// 这个配置里面只配置了.js、.vue、图片、字体等几类文件的处理规则，如果需要处理其他文件可以在module.rules里面另行配置。
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
//引入多页面支持
const multipageHelper = require('./multipage-helper')

// 获取绝对路径
//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: multipageHelper.getEntries(), //设置入口集合
  // webpack入口文件
  // entry: {
  //   app: './src/main.js'
  // },
  // webpack输出路径和命名规则
  output: {
    // webpack输出的目标文件夹路径（例如：/dist）
    path: config.build.assetsRoot,
    // webpack输出bundle文件命名格式
    filename: '[name].js',
    // webpack编译输出的发布路径（例如'//cdn.xxx.com/app/'）
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 模块resolve的规则
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // 别名，方便引用模块，例如有了别名之后，
    // import Vue from 'vue/dist/vue.common.js'可以写成 import Vue from 'vue'
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src/modules'),
      'utils': resolve('src/utils'),
    }
  },
  // 不同类型模块的处理规则
  module: {
    rules: [
      {
        // 对src和test文件夹下的.js和.vue文件使用eslint-loader进行代码规范检查
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        // 对所有.vue文件使用vue-loader进行编译
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        // 对src和test文件夹下的.js文件使用babel-loader将es6+的代码转成es5
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        // 对图片资源文件使用url-loader
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的图片转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的图片转移到静态资源文件夹
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        // 对多媒体资源文件使用url-loader
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        // 对字体资源文件使用url-loader
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          // 小于10K的资源转成base64编码的dataURL字符串写到代码中
          limit: 10000,
          // 其他的资源转移到静态资源文件夹
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
