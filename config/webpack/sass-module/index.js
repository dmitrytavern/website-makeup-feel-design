const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (config) {
	const sassRuleDev = {
		test: /\.s[ac]ss$/i,
		use: [
			"style-loader",
			{ loader: "css-loader", options: { sourceMap: true } },
			{ loader: "resolve-url-loader", options: { sourceMap: true } },
			{ loader: "sass-loader", options: { sourceMap: true } },
		],
	}

	const sassRuleBuild = {
		test: /\.s[ac]ss$/i,
		exclude: /\.page\.s[ac]ss$/i,
		use: [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					publicPath: '../'
				},
			},
			"css-loader",
			{
				loader: 'postcss-loader',
				options: {
					postcssOptions: {
						config: config.routes.config
					}
				}
			},
			"resolve-url-loader",
			{
				loader: 'sass-loader',
				options: {
					sourceMap: true,
					sassOptions: {
						minimize: false,
						outputStyle: 'expanded'
					}
				}
			},
		],
	}


	const sassFilename = process.env.BUILD_FILENAME_CSS
	const sassPluginBuild = [
		new MiniCssExtractPlugin({
			filename: function (data) {
				const name = data.chunk.name
				if (!name.match(/app/)) return 'css/[name].css'
				if (name.match(/\.min/)) {
					return `css/${sassFilename}.min.css`
				} else {
					return `css/${sassFilename}.css`
				}
			},
		}),
	]

	const minimizer = [
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
			canPrint: true
		})
	]


	if (config.devMode) {
		// Dev mode
		config.webpack.rules.push(sassRuleDev)
	} else {
		// Prod mode
		config.webpack.rules.push(sassRuleBuild)
		config.webpack.plugins.push(...sassPluginBuild)
		config.webpack.minimizer.push(...minimizer)
	}

	console.log('[BUNDLER]: Module sass is loaded')
}
