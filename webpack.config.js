const path = require('path');

const IS_DEV = process.env.NODE_ENV === 'development';

const config = {
  entry: [
    'babel-polyfill',
    './js/gallery.js',
    './js/load-data.js',
    './js/upload.js',
    './js/form.js',
    './js/filters.js',
    './js/picture.js',
    './js/preview.js',
    './js/utils.js',
    './js/main.js',
  ],
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  devtool: IS_DEV ? 'eval-source-map' : false,
  watch: IS_DEV,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

if (IS_DEV) {
  config.devServer = {
    contentBase: ('./'),
    compress: true,
    port: 9000,
  };
}

module.exports = config;
