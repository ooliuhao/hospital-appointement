const {
  defineConfig
} = require('@vue/cli-service')

const path = require('path'); //引入path模块

const tt = require('./src/config/index')

function resolve(dir) {
  return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}
// console.log('process.env.VUE_APP_SERVER_URL', process.env.VUE_APP_SERVER_URL)

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // host: tt.getNetworkIp(),
    port: 81,
    proxy: {
      '/api': { //   若请求的前缀不是这个'/api'，那请求就不会走代理服务器
        // target: 'http://127.0.0.1:5000',  //这里写路径 
        target: process.env.VUE_APP_SERVER_URL, //这里写路径 
        pathRewrite: {
          '^/api': '/api'
        }, //将所有含/api路径的，去掉/api转发给服务器
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('./src/views'))
      .set('assets', resolve('./src/assets'))
    // ,
    // config.module
    //     .rule('pdf')
    //     .test(/\.pdf$/)
    //     .use('pdf-loader')
    //     .loader('pdf-loader')
    //     .end()
    //set第一个参数：设置的别名，第二个参数：设置的路径
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false
})