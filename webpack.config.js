const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const os = require('os')
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
const AutoDllPlugin = require('autodll-webpack-plugin');

module.exports = {
    entry: {
        app: [
            'react-hot-loader/patch',
            './src/app/app.js'
        ],
        // vendor:['react','react-dom','react-router-dom'],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js',
        chunkFilename: '[name].js',
        // publicPath:'/'
    },
    // devtool: 'inline-source-map',
    resolve: {
        extensions: [
            ".js", ".jsx"
        ],
        alias: {
            '@': path.resolve(__dirname, './src/'),
            '@docs': path.resolve(__dirname, './docs'),
            '@comp': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@DB': path.resolve(__dirname, './src/db'),
        }
    },
    resolveLoader: {
        // 因为 html-loader 是开源 npm 包，所以这里要添加 'node_modules' 目录
        modules: [path.join(__dirname, './src/loaders'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use:[
                {
                    loader:'babel-loader'
                },
                {
                    loader:'md2rc-loader'
                }],
                exclude: /node_modules/
            }, {
                test: /\.(css|scss)/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                {
                    loader:'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }
                ],

            },
        ]
    },
    // 使用externals html里需手动引入一下js，特别注意：还需额外引入moment.js，并放在antd之前，否则会报错
    // externals:{
    //     'react':'React',
    //     'react-dom':'ReactDOM',
    //     'react-router-dom':'ReactRouterDOM',
    //     'antd':'antd',
    // },
    // webpack 可以监听文件变化，当它们修改后会重新编译。这个页面介绍了如何启用这个功能，以及当 watch 无法正常运行的时候你可以做的一些调整。
    watch: true,
    watchOptions:{
        ignored: /node_modules/,
    },
    devServer: {
        host:'0.0.0.0',
        port: 8084,                 //设置默认监听端口，如果省略，默认为8080
        historyApiFallback: true,   //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        hot: true,                  //是否热部署
        quiet: false,               //让dev server处于静默的状态启动
        // contentBase:'./test',
        stats: {
            colors: true, // color is life
            chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
            'errors-only': true
        },

        // proxy: {
        //     "/api": {
        //         target: "https://api.github.com/users",
        //         // pathRewrite: {"^/api" : ""}
        //     }
        // }
    },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     name:'vendor',                                  //将公共模块打包
        //     // filename:'vendor.js'
        // }),
        new HappyPack({id: 'jsx', threadPool: happyThreadPool, loaders: ['babel-loader']}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            __LOCAL__: true,
            __PRO__: false
        }),
        new HtmlWebpackPlugin({                         //生成模板文件
            template: './index.html',
            filename: 'index.html',
            chunks: ['app'],
            // manifest:'dist/static/common-1.0.0.js',
        }),
        // new webpack.DllReferencePlugin({
        //     // context: __dirname,
        //     manifest: require('./dist/static/common.manifest.json'),
        //     // name:'dll'
        // }),
        new AutoDllPlugin({
            inject: true, // will inject the DLL bundle to index.html
            debug: true,
            filename: '[name]-1.0.0.js',
            path: 'http://jiaopeitoutiao-test.oss-cn-hangzhou.aliyuncs.com/js/jiameng_buc/test/',
            plugins:[
                new webpack.DefinePlugin({
                    'process.env': {
                        NODE_ENV: '"development"'
                    },
                }),
            ],
            entry: {
                common: [
                'react',
                'react-dom',
                'react-router-dom',
                ]
            }
        })
    ]
}
