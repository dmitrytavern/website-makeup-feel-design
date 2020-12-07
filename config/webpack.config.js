const { join } = require('path')

require('dotenv').config()

const configurations = {
	devMode: process.env.NODE_ENV === 'development',
	routes: {
		root: join(__dirname, '../'),
		resources: join(__dirname, '../', 'src'),
		build: join(__dirname, '../', 'dist'),
		config: join(__dirname)
	},
	webpack: {
		rules: [],
		plugins: [],
		minimizer: [],
		resolve: {
			extensions: ['*', '.js']
		},
	}
}


configurations.entry = {
	app: join(configurations.routes.resources, 'js', 'app.js')
}
if (!configurations.devMode) {
	configurations.entry['app.min'] = join(configurations.routes.resources, 'js', 'app.js')
}



require('./webpack/html-module/index')(configurations)
require('./webpack/javascript-module/index')(configurations)
require('./webpack/sass-module/index')(configurations)
require('./webpack/image-module/index')(configurations)
require('./webpack/fonts-module/index')(configurations)
require('./webpack/favicon-module/index')(configurations)
require('./webpack/sprite-module/index')(configurations)
require('./webpack/dotenv-module/index')(configurations)

module.exports = configurations
