/*
* @Author: Reshift0023
* @Date:   2018-05-30 10:33:43
* @Last Modified by:   Reshift0023
* @Last Modified time: 2018-05-30 16:24:20
*/
const path 				= require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: "./src/app.jsx",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.js'
	},
	module: {
		rules: [{
			test: /\.jsx$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
						presets: ['env', 'react']
				}
			}
		}]
	},
	plugins: [
	new HtmlWebpackPlugin({
		template: './src/index.html'
	})
	]
};

