var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: {
        main: './src/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        contentBase: './dist',
        open: true
    },
    module: {
        rules: [{
            test: /\.png$/,
            use: {
                loader: 'url-loader',
                options: {
                    name: '[name]_[hash].[ext]',
                    outputPath: 'images/',
                    limit: 2048
                }
            }
        },{
            test: /\.scss$/,
            use: [
                "style-loader", 
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                    }
                },
                "sass-loader",
                "postcss-loader"
            ]
        },{
            test: /\.css$/,
            use: [
                "style-loader", 
                "css-loader",
                "postcss-loader",
            ]
        },{
            test: /\.(eot|ttf|svg|woff|woff2)$/,
            use: {
                loader: 'file-loader'
            }
        }]
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),new CleanWebpackPlugin()]
}