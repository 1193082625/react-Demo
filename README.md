## 安装依赖

* npm init -y 初始化项目，创建package.json文件
* npm install --save-dev webpack    安装webpack    (**模块打包机**)
* npm install --save-dev webpack-dev-server     _本地的开发服务器_    **监测代码的修改，并自动刷新修改后的结果**
* npm install --save-dev html-webpack-plugin open-browser-webpack-plugin  安装插件  **HtmlWebpackPlugin:依据一个简单的模板，生成最终的Html5文件**   **open-browser-webpack-plugin：自动打开浏览器**
* npm install --save-dev autoprefixer babel-plugin-react-transform bundle-loader extract-text-webpack-plugin  安装热加载
* npm install --save-dev postcss-modules-values
* npm install --save-dev react react-dom 安装react


* npm install --save-dev react-router react-router-dom 安装react-router
* npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react 安装babel
* npm install --save-dev file-loader style-loader css-loader url-loader postcss-loader  安装loader
* npm install --save-dev path



## 配置webpack.config.js

```
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")

const values = require('postcss-modules-values')

module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    entry: {
        // mainCodeSplit: path.resolve(__dirname, 'app/mainCodeSplit.js'),
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
```



## 配置.babelrc

```
{
  "presets": [ "es2015", "react"],

  /* if you want to use babel runtime, uncomment the following line */
  // "plugins": ["transform-runtime"],

  "env": {
    "development": {
      "plugins": [
        [
          "react-transform",
          {
            "transforms": [
              {
                "transform": "react-transform-hmr",
                "imports": [
                  "react"
                ],
                "locals": [
                  "module"
                ]
              }
            ]
          }
        ]
      ]
    }
  }
}

```



## 配置package.json

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --inline --content-base .",
    "build": "webpack"
  },
```



运行： npm start

打包： npm build