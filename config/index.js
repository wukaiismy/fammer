"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/wangtian": {
        // 测试环境
        target: "http://94.191.125.82", // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/wangtian": "/wangtian" //需要rewrite重写的,
        }
      },
      "/sta_me": {
        // 测试环境
        target: "http://94.191.125.82", // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/sta_me": "/sta_me" //需要rewrite重写的,
        }
      },
      "/oauth": {
        // 测试环境
        target: "https://aip.baidubce.com", // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/oauth": "/oauth" //需要rewrite重写的,
        }
      },
      "/rest": {
        // 测试环境
        target: "https://aip.baidubce.com", // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/rest": "/rest" //需要rewrite重写的,
        }
      },
      "/facepp": {
        // 人脸识别
        target: "https://api-cn.faceplusplus.com", // 接口域名
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/facepp": "/facepp" //需要rewrite重写的,
        },
        "/wangtian_backend": {
          // 测试环境
          target: "http://94.191.125.82", // 接口域名
          changeOrigin: true, //是否跨域
          pathRewrite: {
            "^/wangtian_backend": "/wangtian_backend" //需要rewrite重写的,
          }
        }
      }
    },

    // Various Dev Server settings
    host: "0.0.0.0", // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // index: path.resolve(__dirname, "../dist/index.html"),
    //将文件直接编译到 cordova 项目下面
    index: path.resolve(__dirname, "../../www/index.html"),
    // Paths
    // assetsRoot: path.resolve(__dirname, "../dist"),
    assetsRoot: path.resolve(__dirname, "../../www"),
    assetsSubDirectory: "static",
    assetsPublicPath: "./",

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
};
