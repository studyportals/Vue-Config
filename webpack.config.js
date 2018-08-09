const path = require("path");
const webpack = require("webpack");
const {setProcessEnvPlugin, setUglifyPlugin} = require('./webpack-helpers.js');

const dllFolder = path.join(__dirname, "dist");

module.exports = {
  context: process.cwd(),
  resolve: {
     extensions: ['.js', '.jsx', '.json', '.less', '.css'],
     modules: [__dirname, 'node_modules']
  },
  entry: {
     library: [
        './index.js',
     ]
  },
  output: {
     filename: '[name].dll.js',
     path: dllFolder,
  },
  plugins: [
    new webpack.DllPlugin({
       name: '[name]',
       path: path.join(dllFolder, '[name].manifest.json')
    })
 ]
};

module.exports.plugins = setProcessEnvPlugin(module.exports.plugins);

// Make necessary modifications for production environment.
if(process.env.NODE_ENV === 'production'){

	module.exports.devtool = '#source-map';
	module.exports.plugins = setUglifyPlugin(module.exports.plugins);
}
