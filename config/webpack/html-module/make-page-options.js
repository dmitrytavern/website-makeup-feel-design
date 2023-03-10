const { join } = require('path')

const fs = require('fs')

module.exports = function (config, page) {
	const { resources, build } = config.routes

	const viewsRouteDev = join(resources, 'views')
	const viewsRouteBuild = join(build)

	const filename = page.replace('.pug', '')

	return {
		minify: false,
		favicon: false,
		inject: false,
		templateParameters: {
			filename,

			title: filename + ' -  page',

			mode: process.env.NODE_ENV,

			process: process,

			route(url) {
				const name = url.match(/\.html/) ? url : url+'.html'
				return join(process.env.APP_PUBLIC_PATH, name)
			},

			routeActive: function (route) {
				return filename === route
			},

			sprite: function (id) {
				return join(process.env.APP_PUBLIC_PATH, 'img/sprite.svg#ico-' + id)
			},

			scriptPageExists: function () {
				return fs.existsSync(join(resources, 'js', 'pages', page.replace('.pug', '.js')))
			},
		},
		template:  join(viewsRouteDev, page),
		filename:  join(viewsRouteBuild, page.replace('.pug', '.html')),
	}
}