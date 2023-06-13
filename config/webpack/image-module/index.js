const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = function (config) {
	config.webpack.rules.push({
		test: /\.(png|jpg|jpeg|webp|gif|mp4|WebM|mp3|ogg)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'img/[name][ext]'
		}
	})

	if (!config.devMode && process.env.BUILD_OPTIMIZATION_IMAGES !== 'false') {
		config.webpack.plugins.push(
			new ImageMinimizerPlugin({
				cache: true,
				minimizerOptions: {
					cache: true,
					plugins: [
						['gifsicle', { interlaced: true }],
						['jpegtran', { progressive: true }],
						['optipng', { optimizationLevel: 5 }],
					],
				},
			})
		)
	}

	console.log('[BUNDLER]: Module images is loaded')
}