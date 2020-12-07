
module.exports = function (config) {
	config.webpack.rules.push({
		test: /\/favicon\/.*(png|jpg|ico|webmanifest|svg)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'img/favicon/[name][ext]'
		}
	})

	console.log('[BUNDLER]: Module favicon is loaded')
}