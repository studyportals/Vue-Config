const path = require("path");
const webpack = require("webpack");
const {determineAlias, setProcessEnvPlugin, setUglifyPlugin} = require('./webpack-helpers.js');

module.exports = {
	entry: {
		vueConfig:[
			'./index.js',
		]
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, "dist"),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "dist", "[name].json"),
			name: "[name]",
			context: path.resolve(__dirname, "client")
		})
	],
};

module.exports.plugins = setProcessEnvPlugin(module.exports.plugins);

// Make necessary modifications for production environment.
if(process.env.NODE_ENV === 'production'){

	module.exports.devtool = '#source-map';
	module.exports.plugins = setUglifyPlugin(module.exports.plugins);
}
