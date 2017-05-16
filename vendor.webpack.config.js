var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		'inferno': ['inferno', 'inferno-component'],
		'react': ['react', 'react-dom'],
		'immutable': ['baobab'],
		'router': ['router5'],
		'ajax': ['axios']
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'vendor'),
		library: '[name]_lib'
	},
	plugins: [
		/*new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),*/
		new webpack.DllPlugin({
			path: 'vendor/[name]-manifest.json',
			name: '[name]_lib'
		}),
		/*new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false
		    }
		})*/
	]
};