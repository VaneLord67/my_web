module.exports = {
    lintOnSave:false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://api.bilibili.com',
                pathRewrite:{'^/api':'/'},        // 正则匹配 重写
                ws: true,                        // 用于支持websocket
                changeOrigin: true               // false时代理服务器不伪造端口  true时伪造端口. 用于控制请求头中的host值
            },

        }
    }
}