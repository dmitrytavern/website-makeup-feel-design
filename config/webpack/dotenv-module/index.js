const Dotenv = require('dotenv-webpack');

module.exports = function (config) {
	config.webpack.plugins.push(
		new Dotenv()
	)

	console.log('[BUNDLER]: Module dotenv is loaded')
}