var webpack = require('webpack');
var path = require('path');

module.exports = {
    mode: 'development',
    performance: { hints: false },
    devtool: 'env',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'www/js'),
        publicPath: 'js'
    },
    devServer: {
        inline: true,
        contentBase: './www',
        port: 3000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js$/,
                loaders: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                }
            },
            {
                test: /\.woff2$/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    outputPath: '/fonts/'
                }
            }
        ]
    }
}
