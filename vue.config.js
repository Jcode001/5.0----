const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  outputDir: process.env.VUE_APP_outputDir || 'dist',
  assetsDir: 'static',
  filenameHashing: true,
  lintOnSave: false,
  runtimeCompiler: false,
  transpileDependencies: [],
  productionSourceMap: false,
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === "production" ? true : false, //是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
    sourceMap: false, //是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能。
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/variables.scss";`
      }
    },
    //requireModuleExtension: true,
  },

  chainWebpack: (config) => {
    // 配置别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('assetsBig', resolve('src/pages/big-screen/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('api', resolve('src/api'))
      .set('lib', resolve('src/lib'))
      .set('01xmjs', resolve('src/components/01xmjs'))
      .set('02xtpx', resolve('src/components/02xtpx'))
      .set('03xxsz', resolve('src/components/03xxsz'))
      .set('04rwdd', resolve('src/components/04rwdd'))
      .set('05yxjk', resolve('src/components/05yxjk'))
      .set('06yxrz', resolve('src/components/06yxrz'))
      .set('07aqbj', resolve('src/components/07aqbj'))
      .set('08ywbb', resolve('src/components/08ywbb'))

    if (process.env.NODE_ENV === "production") {
      // 删除系统默认的splitChunk
      config.optimization.delete("splitChunks");
    }
    // 删除预加载
    //  // 移除 prefetch  插件
    //  config.plugins.delete('prefetch-index')
    //  // 移除 preload 插件
    //  config.plugins.delete('preload-index');
    //   config.optimization.minimizer('terser').tap((args) => {
    //     // 去除生产环境console
    //     args[0].terserOptions.compress.drop_console = true
    //     return args
    //   })
  },
  configureWebpack: config => {
    // 给输出的js名称添加hash
    config.output.filename = "static/js/[name].[hash].js";
    config.output.chunkFilename = "static/js/[name].[hash].js";
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          // 抽离所有入口的公用资源为一个
          common: {
            name: "chunk-common",
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          // 抽离node_modules下的库为一个chunk
          // vendors: {
          //   name: "chunk-vendors",
          //   test: /[\\/]node_modules[\\/]/,
          //   chunks: "initial",
          //   priority: 2,
          //   reuseExistingChunk: true,
          //   enforce: true
          // },
          element: {
            name: "chunk-element-ui",
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: "all",
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          yhhtUi: {
            name: "chunk-yhht-ui",
            test: /[\\/]node_modules[\\/]yhht-ui[\\/]/,
            chunks: "all",
            priority: 4,
            reuseExistingChunk: true,
            enforce: true
          },
          datav: {
            name: "chunk-datav",
            test: /[\\/]node_modules[\\/]@jiaminghi[\\/]data-view[\\/]/,
            chunks: "all",
            priority: 4,
            reuseExistingChunk: true,
            enforce: true
          },
        }
      }
    };
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,

  devServer: {
    // 配置多个代理

    port: 8081, //设置项目端口号这是vue项目端口
    // host: "10.168.2.61", //允许所有的主机访问当前项目
    open:true,
    proxy: {
      '/api': { //正则匹配到以这个开头的时候 就用代理
        // target: "http://127.0.0.1:8001",// 指向的是目标服务器
        target: "http://10.168.1.39:8086/", // 公司服务器
        // target: "http://10.168.2.43:8086/", // 指向的是目标服务器
        changOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {}
}