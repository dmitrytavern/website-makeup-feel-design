const config = require('./webpack.config')

module.exports = {
	mode: "production",
	entry: config.entry,
	output: {
		path: config.routes.build,
		filename: function (data) {
			const name = data.chunk.name
			if (!name.match(/app/) || name.match(/\.vendor/)) return 'js/[name].js'
			if (name.match(/\.min/)) {
				return `js/${process.env.BUILD_FILENAME_JS}.min.js`
			} else {
				return `js/${process.env.BUILD_FILENAME_JS}.js`
			}
		},
		publicPath: process.env.APP_PUBLIC_PATH
	},
	module: {
		rules: config.webpack.rules,
	},
	plugins: config.webpack.plugins,
	optimization: {
		minimizer: config.webpack.minimizer,
	},
}
