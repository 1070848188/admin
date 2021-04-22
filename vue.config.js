
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    devServer: {
        host: 'localhost',
        port: '8080',
        hot: true,
        open: true,
        overlay: {
            warning: false,
            error: true
        },
        proxy: { // 代理
            '/api': { // 以此路径开头的请求进行代理
                target: process.env.VUE_APP_BASE_API, // 代理地址 替换axios中的baseUrl
                changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                secure: false, // 支持运行在HTTPS上
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        resolve: {
            alias: {
                '@': resolve('src') // 将所有引用文件下的@替换成src绝对目录
            }
        }
    }
}