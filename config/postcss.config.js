module.exports = () => {
	const plugins = [
		require('autoprefixer')
	]

	if ( process.env.BUILD_OPTIMIZATION_CSS_MEDIA === 'true' ) {
		plugins.push(
			require("postcss-combine-media-query")
		)
	}

	return {
		plugins,
	}
}
