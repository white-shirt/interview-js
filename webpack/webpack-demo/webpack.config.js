const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports={
    mode: 'development',
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        // publicPath: '',     // 线上路径
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, './node_modules'),
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new htmlWebpackPlugin({
        //     template: 'index.html',  // html 模版
        //     filename: 'main.html',    // 输出的文件名
        //     // inject: '',  // 脚本插入位置
        //     title: 'this is main page',   // html 标题
        //     // minify: {},   // 压缩 html
        //     chunks: [ 'main' ],
        // })
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html',

        })
    ]
}