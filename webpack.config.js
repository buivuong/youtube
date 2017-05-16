var path = require('path');
var webpack = require("webpack");

module.exports = {
	//cache: true,
	//devtool: "eval", //or cheap-module-eval-source-map
  	node: {
      	Buffer: false
  	},
	entry: {
    	bootstrap: './src/app/bootstrap'
  	},
  	output: {
    	path: path.join(__dirname, 'build'),
    	publicPath: 'build/',
    	filename: '[name].js',
    	chunkFilename: '[name]-[chunkhash].js'
  	},
  	module: {
    	rules: [
      		{
            test: /\.js?$/,
			    exclude: /node_modules/,
			    loader: 'babel-loader',
			    include: [
				    path.resolve(__dirname, 'src')
			    ],
				query: {
					//cacheDirectory: true,
          		    presets: [
              'es2015',
            'react',
            'stage-2'
          ],
					plugins: []
        		}
      		},
          	{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader?modules&importLoaders=1',
					'postcss-loader'
              	]
          	}
    	]
  	},
  	resolve: {
      	extensions: ['.js', '.jsx', '.css'],
        //unsafeCache: true,
      	modules: [
        	path.resolve('./src'),
            path.resolve('./src/components'),
            'node_modules'
      	]
  	},
  	plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./vendor/react-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./vendor/immutable-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./vendor/router-manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require('./vendor/ajax-manifest.json')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
  	]
};