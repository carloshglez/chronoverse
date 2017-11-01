var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'env',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist'
    },
    devServer: {
        inline: true,
        contentBase: './',
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
            }
        ]
    }
}
