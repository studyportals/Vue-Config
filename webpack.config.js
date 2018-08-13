const path = require("path");
const webpack = require("webpack");
const {determineAlias, setProcessEnvPlugin, setUglifyPlugin} = require('./webpack-helpers.js');

console.log(process.env.NODE_ENV);

const distFolder = path.join(__dirname, 'dist');

const getFileName = () => {
	if(process.env.NODE_ENV === 'production'){
		return '[name].min';
	}

	return '[name]';
}

module.exports = {
	entry: {
		library:[
			'vue',
			'vue-router',
			'vuex',
			'@studyportals/vue-multiselect'
		]
	},
	output: {
		filename: `${getFileName()}.js`,
		path: distFolder,
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(distFolder,  `${getFileName()}.json`),
			name: "[name]"
		})
	]
};

module.exports.plugins = setProcessEnvPlugin(module.exports.plugins);

// Make necessary modifications for production environment.
if(process.env.NODE_ENV === 'production'){

	module.exports.devtool = '#source-map';
	module.exports.plugins = setUglifyPlugin(module.exports.plugins);
}
