const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")

const values = require('postcss-modules-values')

module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry: {
        mainCodeSplit: path.resolve(__dirname, 'app/mainCodeSplit.js'),
        main: path.resolve(__dirname, 'app/main.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'app'),
                loader: "style-loader!css-loader?modules&localIdentName=[local]-[hash:base64:5]"
            },
            {
                test: /\.js[x]?$/,
                include: path.resolve(__dirname, 'app'),
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new HtmlWebpackPlugin({ // 自动生成html页面
            title: 'Webpack-demos',
            template: __dirname + "/app/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(), // 自动热加载
        new OpenBrowserPlugin({ // 自动浏览器打开界面
            url: 'http://localhost:8080'
        }),
        new webpack.optimize.UglifyJsPlugin(), // 压缩代码
        new CommonsChunkPlugin('init'), // 提取公共代码
        // new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }), // 提取供应商公共代码
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        contentBase: "./app",
        port: 8080
    }
}