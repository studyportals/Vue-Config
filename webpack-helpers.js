const webpack = require("webpack");


/**
 * Include a plugin that sets the node environment variable to the right environment.
 *
 * @param {Array} plugins
 * @returns {Array}
 */

exports.setProcessEnvPlugin = function(plugins){

	return (plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	]);
};

/**
 * Include a plugin that ensures that the file that webpack produces is uglified.
 *
 * @param {Array} plugins
 * @returns {Array}
 */

exports.setUglifyPlugin = function(plugins){

	plugins = (plugins || []).concat([
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			},
			output: {
				comments: false
			},
			keep_fnames: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);

	return plugins;
};
