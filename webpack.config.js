const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const IS_DEV = process.env.NODE_ENV === 'development';

const config = {
  entry: ['babel-polyfill', './src/js/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
  },
  devtool: IS_DEV ? 'eval-source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
      },
    ),
    new CopyPlugin({
      patterns: [
        {from: 'src/img', to: 'img'},
        {from: 'src/photos', to: 'photos'},
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /.(jpg|jpeg|png|svg|woff2?)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
        },
      },
    ],
  },
};

if (IS_DEV) {
  config.devServer = {
    contentBase: ('./dist'),
    compress: true,
    port: 9000,
  };
}

module.exports = config;
