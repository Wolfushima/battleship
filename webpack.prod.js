const path = require('path');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    ],
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader, // 3. Extract css into files
                    'css-loader', // 2. Turns css into commonjs
                    'sass-loader'], // 1. Turns sass into css
            },
        ],
    },
});
