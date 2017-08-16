const path = require('path');
const webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

function createConfig(target) {
    var name = 'index.js';

    if(target !== 'commonjs2') {
        name = 'vue-croppie.js'
    }

    var output = {
        library: 'VueCroppie',
        libraryTarget: target,
        path: path.resolve(__dirname, 'dist'),
        filename: name
    }
    
    if(typeof target === 'undefined') {
        name = 'vue-croppie.js';
        output = {
            path: path.resolve(__dirname, 'dist'),
            filename: name
        }
    }

    return {
        name: target,
        entry: './src/index.js',
        output: output,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    loader:'style-loader!css-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                }
            ]
        },
        plugins:[
            new webpack.optimize.UglifyJsPlugin({
                mangle: true,
                compress: {
                    warnings: false, // Suppress uglification warnings
                    pure_getters: true,
                    unsafe: true,
                    unsafe_comps: true,
                    screw_ie8: true
                },
                output: {
                    comments: false,
                },
                exclude: [/\.min\.js$/gi] // skip pre-minified libs
            }),
            new CompressionPlugin({
                asset: "[path].gz[query]",
                algorithm: "gzip",
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0
            })
        ]
    }
}

module.exports = [
    createConfig('var'),
    createConfig('commonjs2')
]