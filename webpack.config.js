const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
            },
        }),
        new MiniCssExtractPlugin({
            // filename: "[name].[contenthash].css",
            filename: 'style.css',
        }),
        new CopyPlugin({
            patterns: [{ from: 'img', to: 'img' }],
        }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
}
