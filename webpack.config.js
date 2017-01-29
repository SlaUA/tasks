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
			},
			{
				test: /\.jpg$/,
				loader: 'file-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!"),
				options: {
					minimize: true
				}
			}
		]
	},
	plugins: debug ? [
			new CopyWebpackPlugin([
				{
					from: path.join(__dirname, 'src/index.html'),
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