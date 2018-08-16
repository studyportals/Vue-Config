const path = require("path");
const webpack = require("webpack");

const isProduction = () => process.env.NODE_ENV === 'production';
const getDistFolder = () => path.join(__dirname, 'dist');
const getFileName = () => (isProduction()) ? '[name].min' : '[name]';

const WebPackConfig = {
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
		path: getDistFolder(),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(getDistFolder(),  `${getFileName()}.json`),
			name: "[name]"
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	]
};

if(process.env.NODE_ENV === 'production'){

	WebPackConfig.devtool = '#source-map';
	WebPackConfig.plugins = WebPackConfig.plugins.concat([
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
}

module.exports = WebPackConfig;
