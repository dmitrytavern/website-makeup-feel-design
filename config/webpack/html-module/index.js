const { join } = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const makeOptions = require('./make-page-options')

module.exports = function (config) {
	const { resources } = config.routes

	const viewsRouteDev = join(resources, 'views')

	const pugRule = {
		test: /\.pug$/,
		use: [
			{loader: 'pug-loader', options: {pretty: true}},
		],
	}

	const pages = fs
		.readdirSync(viewsRouteDev)
		.filter(fileName => fileName.endsWith('.pug'))
		.map(page => {
			return new HtmlWebpackPlugin(makeOptions(config, page))
		})

	console.log('[BUNDLER]: Module html is loaded')

	config.webpack.plugins.push(...pages)
	config.webpack.rules.push(pugRule)
}
