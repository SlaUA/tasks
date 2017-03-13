let path = require('path'),
    debug = process.env.NODE_ENV !== 'production',
    webpack = require('webpack'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: ['./src/js/index.js']
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080,
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'es2015',
                        'stage-2',
                        'react'
                    ]
                }
            }, {
                test: /\.jpg$|\.png$/,
                loader: 'file-loader'
            }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader", "autoprefixer-loader"
                    ]
                })
            }
        ]
    },
    plugins: debug ? [
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'src/index.html'),
            to: '../build'
        }, {
            from: path.join(__dirname, 'src/img/favicon.ico'),
            to: '../build'
        }
        ]),
        new ExtractTextPlugin('bundle.css')
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        })
    ],
};