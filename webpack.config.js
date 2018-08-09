const path = require("path");
const webpack = require("webpack");
const {determineAlias, setProcessEnvPlugin, setUglifyPlugin} = require('./webpack-helpers.js');

const dllFolder = path.join(__dirname, "dist");

module.exports = {
	context: process.cwd(),
	entry: {
		library: [
			'./index',
		]
	},
	output: {
		filename: '[name].js',
		path: dllFolder,
	}
};

module.exports.plugins = setProcessEnvPlugin(module.exports.plugins);

// Make necessary modifications for production environment.
if(process.env.NODE_ENV === 'production'){

	module.exports.devtool = '#source-map';
	module.exports.plugins = setUglifyPlugin(module.exports.plugins);
}
