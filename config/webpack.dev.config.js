const config = require('./webpack.config')

const { build } = config.routes

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

let array = []
const entry = Object.entries(config.entry)
for (let [_, route] of entry) {
	array.push(route)
}

module.exports = {
	mode: "development",
	entry: [
		'webpack-dev-server/client',
		'webpack/hot/dev-server',
		...array
	],
	devtool: 'inline-source-map',
	output: {
		path: build,
		filename: "js/[name].js",
		publicPath: ''
	},
	module: {
		wrappedContextCritical: false,
		wrappedContextRecursive: false,
		rules: config.webpack.rules
	},
	plugins: [
		...config.webpack.plugins,

		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: build,
		port: 3000,

		// Reloading browser if html was is change
		before(app, server, compiler) {
			const cache = {}
			compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
				HtmlWebpackPlugin.getHooks(compilation).afterEmit.tap('MyPlugin', data => {
					const orig = cache[data.outputName]
					const html = data.plugin.childCompilerHash

					if (orig === undefined) {
						server.sockWrite(server.sockets, 'content-changed')
					}

					if (orig && orig !== html) {
						server.sockWrite(server.sockets, 'content-changed')
					}

					cache[data.outputName] = html
				})
			});
		},
	}
}
