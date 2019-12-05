const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = () => process.env.NODE_ENV === 'production';
const getDistFolder = () => path.join(__dirname, 'dist');
const getFileName = () => (isProduction()) ? '[name].min' : '[name]';

const WebPackConfig = {
	entry: {
		"vue_config": [
			'vue',
			'vue-router',
			'vuex',
			'@studyportals/vue-multiselect'
		]
	},
	output: {
		filename: `${getFileName()}.js`,
		path: getDistFolder(),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(getDistFolder(), `${getFileName()}.json`),
			name: "[name]"
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		}),
	],
	optimization: {
		minimize: false
	},
};

if (process.env.NODE_ENV === 'production') {

	WebPackConfig.devtool = '#source-map';
	WebPackConfig.plugins = WebPackConfig.plugins.concat([
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	]);

	WebPackConfig.optimization.minimize = true;
}

module.exports = WebPackConfig;
