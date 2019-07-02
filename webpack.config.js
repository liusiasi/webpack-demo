var path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.png$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: '[name]_[hash].[ext]'
                }
            }
        }]
    }
}