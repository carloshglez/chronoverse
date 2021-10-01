var path = require('path');
var webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const pkg = require('./package.json');

module.exports = {
	mode: 'production',
	performance: { hints: false },
	devtool: 'source-map',
	entry: './src/index',
	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, 'www/js'),
		publicPath: 'js'
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			},
			AppVersion: JSON.stringify(pkg.version)
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					warnings: false
				}
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			},
			{
				test: /\.js$/,
				loaders: 'babel-loader',
				query: {
					presets: ['react', 'es2015', 'stage-0']
				}
			},
			{
				test: /\.woff2$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					outputPath: '/fonts/'
				}
			}
		]
	}
};
