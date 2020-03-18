const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackDevServer = require('webpack-dev-server')

module.exports = {
    mode: 'development',
    entry: {
        main: './index.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: true,
        port: 8080
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new CleanWebpackPlugin()
    ]
}