let path = require('path'),
	config = require('./config'),
    development = (process.env.NODE_ENV || config.environment) === 'dev',
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
    plugins: development ? [
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
	    new CopyWebpackPlugin([{
		    from: path.join(__dirname, 'src/index.html'),
		    to: '../build'
	    }, {
		    from: path.join(__dirname, 'src/img/favicon.ico'),
		    to: '../build'
	    }
	    ]),
	    new ExtractTextPlugin('bundle.css'),
	    new webpack.optimize.OccurrenceOrderPlugin(),
	    new webpack.DefinePlugin({
		    'process.env': {
			    NODE_ENV: JSON.stringify('production')
		    }
	    }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false,
	        warnings: false
        })
    ],
};