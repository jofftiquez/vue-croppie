const path = require('path');
const webpack = require('webpack');

function createConfig(target) {
  var name = 'index.js';

  if (target !== 'commonjs2') {
    name = 'vue-croppie.js'
  }

  var output = {
    library: 'VueCroppie',
    libraryTarget: target,
    path: path.resolve(__dirname, 'dist'),
    filename: name
  }

  if (typeof target === 'undefined') {
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
          loader: 'style-loader!css-loader'
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
    }
  }
}

module.exports = [
  createConfig('var'),
  createConfig('commonjs2')
];