module.exports = {
	comments: false,
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current'
				}
			}
		]
	],
	plugins: [
		"@babel/plugin-transform-arrow-functions",
	]
};