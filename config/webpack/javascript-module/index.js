const TerserPlugin = require("terser-webpack-plugin");

module.exports = function (config) {
	const rule = {
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		use: {
			loader: "babel-loader",
			options: {
				presets: ['@babel/preset-env']
			}
		}
	}

	const ruleVendorJs = {
		test: /\/vendor\/.*js$/,
		type: "asset/resource",
		generator: {
			filename: 'js/vendor/[name][ext]'
		}
	}

	const rulePageJs = {
		test: /pages\/.*js$/,
		use: [
			{
				loader: "babel-loader",
				options: {
					presets: ['@babel/preset-env']
				}
			}
		],
		type: "asset/resource",
		generator: {
			filename: config.devMode || process.env.BUILD_REQUIRED_MIN_JS === 'false'
				? 'js/pages/[name][ext]'
				: 'js/pages/[name].min[ext]'
		}
	}

	const minimizer = [
		new TerserPlugin({
			test: /\.min\.js(\?.*)?$/i,
			parallel: 4,
			extractComments: false
		}),
	]


	config.webpack.rules.push(rulePageJs)
	config.webpack.rules.push(ruleVendorJs)
	if (!config.devMode) {
		config.webpack.rules.push(rule)
		config.webpack.minimizer.push(...minimizer)
	}

	console.log('[BUNDLER]: Module javascript is loaded')
}