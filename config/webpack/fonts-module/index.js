
module.exports = function (config) {
	config.webpack.rules.push({
		test: /\/fonts\/.*(woff|woff2|eot|ttf|otf|svg)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'fonts/[name][ext]'
		}
	})

	console.log('[BUNDLER]: Module fonts is loaded')
}