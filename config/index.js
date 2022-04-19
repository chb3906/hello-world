'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.
//接口分类
//http://21iz567685.iask.in:21396外网映射网址接口http://21iz567685.iask.in:25127/
//http://192.168.0.106:4006/微服务接口
//http://192.168.0.152:80/本地网络测试环境接口
//http://10.8.207.66:9999/阳光保险接口
//10.10.232.249 80    21iz567685.iask.in:45419
// var baseUrl = 'http://21iz567685.iask.in:45419';
var baseUrl = 'http://10.8.207.66:9999';
const path = require('path')
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/':{
        target:baseUrl,
        changeOrigin:true,
        // pathRewrite: {
        //   '^/api': '' ,
        // },
      },



      // 'cch':{
      //   target:baseUrl,
      //   changeOrigin:true,
      //   pathRewrite: {
      //     '^/cch': '/cch' ,
      //   },
      // },
      //首页api
      // '/home': {//192.168.0.118:25127  192.168.0.143://
      //     target:baseUrl,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/home': '/cmsms' ,
      //     },
      // },
	  // '/product': {
		// 			target:baseUrl,
		// 			changeOrigin: true,
		// 			pathRewrite: {
		// 				'^/product': '/prdmc',//prdmc
		// 				//这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替
    //         //比如我要调用'http://10.1.5.11:8080/xxx/duty?time=2017-07-07 14:57:22'，
    //         //直接写‘/api/xxx/duty?time=2017-07-07 14:57:22’即可
		// 			},
    //   },
      //连接订单号接口产品详情页
      // '/order': {//http://192.168.0.102:4005/
      //     target: baseUrl,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/order': '/ordmc' //ordmc
      //     },
      //  },
        //跳转到阳光端口
      // '/sun': {//192.168.0.118:4006  192.168.0.143:4006//192.168.0.140:9999
      //   target: baseUrl,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/sun': '/sunmc',//auth模块名
      //   },
      //  },
      // 个人中心首页获取用户信息
      // '/mycenter/index': {//192.168.0.118:4006  192.168.0.143:4006
      //   target: baseUrl,//认证端口4010/
      //   // target: 'http://192.168.0.133:4010/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/mycenter/index': '/usermc' ,//usermc
      //   },
    //  },
     //个人中心我的团队
      // '/mycenter/team': {//192.168.0.118:25127  192.168.0.143://
      //     target:baseUrl,
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '/mycenter/team': '/usermc' ,//usermc

      //     },
      // },
      // 个人中心我的客户
      // '/mycenter/client': {//192.168.0.118:4006  192.168.0.143:4006
      //   target: baseUrl,//认证端口4010
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '/mycenter/client': '/prdmc' ,
      //   },
    //  },
     //个人中心我的保单
      // '/mycenter/guarantee': {//192.168.0.118:25127  192.168.0.143://
      //     target:'http://192.168.0.125:4005/',
      //     changeOrigin: true,
      //     pathRewrite: {
      //       '^/mycenter/guarantee': '/' ,//ordmc

      //     },
      // },
      //登陆api/
    //   '/login/auth': {//192.168.0.118:4006  192.168.0.143:4006//192.168.0.140:9999
    //     target: baseUrl,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/login/auth': '/auth',//
    //     },
    //  },
     // '/login': {//192.168.0.118:4006  192.168.0.143:4006//192.168.0.140:9999
     //    target: 'http://192.168.0.126:4010/',
     //    changeOrigin: true,
     //    pathRewrite: {
     //      '^/login': '/',//usermc
     //    },
     // },
        //获取后端数据字典
    //   '/project/admin': {//192.168.0.118:4006  192.168.0.143:4006//192.168.0.140:9999
    //     target: baseUrl,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/project/admin': '/admin',
    //     },
    //  },
    //  '/mycenter/promotion': {//192.168.0.118:4006  192.168.0.143:4006//192.168.0.140:9999
    //     target:baseUrl,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/mycenter/promotion': '/sysmc',
    //     },
    //  },
		},
    // Various Dev Server settings
    // host: 'localhost', // can be overwritten by process.env.HOST
    // host:'10.136.96.144',
    host:'localhost',
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
