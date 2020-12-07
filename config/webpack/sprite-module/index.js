const { join } = require('path')
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = function (config) {
	const { resources } = config.routes

	config.webpack.rules.push({
		test: /\/icons\/.*(svg)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'img/icons/[name][ext]'
		}
	})

	config.webpack.plugins.push(
		new SVGSpritemapPlugin(join(resources, 'img', 'sprite', '**/*.svg'), {
			output: {
				filename: 'img/sprite.svg',
			},
			sprite: {
				prefix: 'ico-',
				generate: {
					title: false,
					symbol: true,
					use: false,
					view: false
				}
			}
		})
	)

	console.log('[BUNDLER]: Module sprite is loaded')
}