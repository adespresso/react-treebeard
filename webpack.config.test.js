'use strict';
module.exports = {
    cache: true,
    devtool: 'inline-source-map',
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: ['babel'],
            cacheDirectory: true,
            query: {
                presets: ['es2015', 'stage-2', 'react'],
            },
        }],
        postLoaders: [{
            test: /\.js$/,
            exclude: [/test\/*/, /node_modules/],
            loader: 'istanbul-instrumenter'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
